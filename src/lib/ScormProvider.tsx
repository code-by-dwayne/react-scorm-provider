import { PipwerksScormAPI } from "@/@types/pipwerks-scorm-api";
import { IScormContextProps } from "@/@types/scorm-context-props";
import { SCORM, debug } from "pipwerks-scorm-api-wrapper";
import React, {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import { Score } from ".";

// Extend the Window interface to include SCORM API properties
declare global {
	interface Window {
		API: any;
		API_1484_11?: any;
	}
}

export const ScoContext = createContext<IScormContextProps | undefined>(
	undefined
);

// Tipo para as versões suportadas do SCORM
type ScormVersion = "1.2" | "2004" | "auto";

// Tipo para as opções de autocommit
type AutoCommitOptions =
	| boolean
	| {
			interval?: number; // intervalo em milissegundos para commits automáticos
			onStateChange?: boolean; // realizar commit quando os dados de estado mudarem
	  };

interface ScormProviderProps {
	children: ReactNode;
	version?: ScormVersion;
	debug?: boolean;
	autoCommit?: AutoCommitOptions;
	autoInitialize?: boolean;
}

const SCORM_CONNECTION = SCORM as PipwerksScormAPI;

const createLoggers = (isDebugActive: boolean) => {
	return {
		log: (message: string, ...args: any[]) => {
			if (isDebugActive) console.log(message, ...args);
		},
		warn: (message: string, ...args: any[]) => {
			if (isDebugActive) console.warn(message, ...args);
		},
		error: (message: string, ...args: any[]) => {
			if (isDebugActive) console.error(message, ...args);
		},
	};
};

const formatSessionTime = (milliseconds: number): string => {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.00`;
};

const ScormProvider: React.FC<ScormProviderProps> = ({
	children,
	version = "auto",
	debug: isDebug,
	autoCommit = true,
	autoInitialize = true,
}) => {
	const [apiConnected, setApiConnected] = useState(false);
	const [learnerName, setLearnerName] = useState("unknown");
	const [completionStatus, setCompletionStatus] = useState("unknown");
	const [suspendData, setSuspendDataState] = useState<Record<string, any>>({});
	const [scormVersion, setScormVersion] = useState<string>("");

	const logger = createLoggers(!!isDebug);

	// Função para detectar automaticamente a versão do SCORM
	const detectScormVersion = useCallback(() => {
		if (window?.API) {
			return "1.2";
		} else if (window?.API_1484_11) {
			return "2004";
		}

		// Tenta encontrar no parent window (caso esteja em um iframe)
		try {
			if (window.parent?.API) {
				return "1.2";
			} else if (window.parent?.API_1484_11) {
				logger.log("Auto-detected SCORM version in parent window: 2004");
				return "2004";
			}
		} catch (e) {
			logger.warn("Error accessing parent window:", e);
		}

		return "1.2";
	}, [logger]);

	const getSuspendData = useCallback(async () => {
		if (!apiConnected) {
			throw new Error("SCORM API not connected");
		}

		try {
			const data = SCORM_CONNECTION.get("cmi.suspend_data");
			let parsedData = {};

			if (data && data !== "{}") {
				try {
					parsedData = JSON.parse(data);
					logger.log("Data successfully retrieved from suspend_data");
				} catch (e) {
					logger.warn("Error processing suspend_data:", e);
				}
			} else {
				logger.warn("No data found in suspend_data");

				const locationData = SCORM_CONNECTION.get("cmi.core.lesson_location");
				if (locationData && locationData.includes("activityId=")) {
					logger.log("Identifier found in lesson_location:", locationData);
				}
			}

			const status = SCORM_CONNECTION.get("cmi.core.lesson_status");
			if (status === "completed" || status === "passed") {
				logger.log("Activity already marked as completed in LMS");

				const score = SCORM_CONNECTION.get("cmi.core.score.raw");
				if (score) {
					logger.log("Score retrieved:", score);
				}
			}

			setSuspendDataState(parsedData);
			return true;
		} catch (error) {
			logger.error("Error loading suspend_data:", error);
			return false;
		}
	}, [apiConnected, logger]);

	const createScormAPIConnection = useCallback((): {
		success: boolean;
		errorMessage?: string;
	} => {
		if (apiConnected) return { success: true };

		if (!autoInitialize) {
			logger.log("Auto initialization disabled, skipping SCORM API connection");
			return { success: false, errorMessage: "Auto initialization disabled" };
		}

		if (typeof window === "undefined") {
			return {
				success: false,
				errorMessage: "The environment does not support SCORM.",
			};
		}

		try {
			const scormVersionToUse =
				version === "auto" ? detectScormVersion() : version;

			if (scormVersionToUse) SCORM_CONNECTION.version = scormVersionToUse;
			if (typeof isDebug === "boolean") debug.isActive = isDebug;

			const API = SCORM_CONNECTION.API.getHandle();

			if (!API) {
				return {
					success: false,
					errorMessage:
						"SCORM API not found in LMS. Make sure the content is running inside a compatible LMS.",
				};
			}

			let isAPIAlreadyInitialized = false;

			if (
				SCORM_CONNECTION.version === "1.2" &&
				typeof API.LMSInitialize === "function"
			) {
				try {
					const initResult = API.LMSInitialize("");
					logger.log("Direct LMSInitialize result:", initResult);

					if (initResult === "false") {
						const errorCode = API.LMSGetLastError();
						const errorString = API.LMSGetErrorString(errorCode);

						if (
							errorCode === "103" ||
							errorString?.includes("Already Initialized")
						) {
							logger.log(
								"API already initialized (SCORM 1.2). Using existing connection."
							);
							isAPIAlreadyInitialized = true;
						} else {
							logger.warn(
								`LMSInitialize failed. Error code: ${errorCode}, Description: ${errorString}`
							);
						}
					} else {
						logger.log("Direct LMSInitialize successful");
					}
				} catch (e) {
					logger.warn("Error during direct API.LMSInitialize call:", e);
				}
			} else if (
				SCORM_CONNECTION.version === "2004" &&
				typeof API.Initialize === "function"
			) {
				try {
					const initResult = API.Initialize("");
					logger.log("Direct Initialize result:", initResult);

					if (initResult === false) {
						const errorCode = API.GetLastError();
						const errorString = API.GetErrorString(errorCode);

						if (
							errorCode === "103" ||
							errorString?.includes("Already Initialized")
						) {
							logger.log(
								"API already initialized (SCORM 2004). Using existing connection."
							);
							isAPIAlreadyInitialized = true;
						} else {
							logger.warn(
								`Initialize failed. Error code: ${errorCode}, Description: ${errorString}`
							);
						}
					} else {
						logger.log("Direct Initialize successful");
					}
				} catch (e) {
					logger.warn("Error during direct API.Initialize call:", e);
				}
			}

			if (isAPIAlreadyInitialized || SCORM_CONNECTION.connection.initialize()) {
				const currentVersion = SCORM_CONNECTION.version;
				const learner =
					currentVersion === "1.2"
						? SCORM_CONNECTION.get("cmi.core.student_name")
						: SCORM_CONNECTION.get("cmi.learner_name");
				const status = SCORM_CONNECTION.status("get");

				setApiConnected(true);
				setLearnerName(learner || "unknown");
				setCompletionStatus(typeof status === "string" ? status : "unknown");
				setScormVersion(currentVersion);

				try {
					getSuspendData();
				} catch (error) {
					logger.warn(
						"Error retrieving suspend data, but connection established:",
						error
					);
				}

				logger.log(
					`SCORM connection ${
						isAPIAlreadyInitialized ? "reused" : "established"
					} (version: ${currentVersion})`
				);
				return { success: true };
			} else {
				let errorCode = "Unknown";
				let errorString = "Unspecified error";

				try {
					if (SCORM_CONNECTION.version === "1.2" && API.LMSGetLastError) {
						errorCode = API.LMSGetLastError();
						errorString = API.LMSGetErrorString(errorCode);
					} else if (SCORM_CONNECTION.version === "2004" && API.GetLastError) {
						errorCode = API.GetLastError();
						errorString = API.GetErrorString(errorCode);
					}
				} catch (e) {
					logger.warn("Could not obtain error details:", e);
				}

				const errorMessage = `Failed to connect to LMS. Error code: ${errorCode}. Description: ${errorString}`;
				logger.error(errorMessage);

				return { success: false, errorMessage };
			}
		} catch (error) {
			const errorMessage = `Unexpected error connecting to LMS: ${
				error instanceof Error ? error.message : String(error)
			}`;
			logger.error(errorMessage);
			return { success: false, errorMessage };
		}
	}, [
		apiConnected,
		version,
		isDebug,
		getSuspendData,
		logger,
		autoInitialize,
		detectScormVersion,
	]);

	const commitData = useCallback(async (): Promise<boolean> => {
		if (!apiConnected) {
			return Promise.reject(new Error("SCORM API not connected"));
		}

		try {
			const exitMode = SCORM_CONNECTION.get("cmi.core.exit");
			if (!exitMode || exitMode !== "suspend") {
				SCORM_CONNECTION.set("cmi.core.exit", "suspend");
			}

			let success = false;

			if (typeof SCORM_CONNECTION.save === "function") {
				success = SCORM_CONNECTION.save();
			}

			if (!success && SCORM_CONNECTION.version === "1.2") {
				try {
					const commitResult = SCORM_CONNECTION.API.LMSCommit();
					success = commitResult === true;
				} catch (e) {
					logger.warn("Error trying direct LMSCommit:", e);
				}
			}

			const suspendData = SCORM_CONNECTION.get("cmi.suspend_data");
			if (!suspendData || suspendData === "{}") {
				logger.warn("Commit did not persist data in suspend_data");
			}

			return success;
		} catch (error) {
			logger.error("Error in commit:", error);
			return false;
		}
	}, [apiConnected, logger]);

	const setSuspendData = useCallback(async () => {
		if (!apiConnected) {
			logger.warn("SCORM API not connected, unable to save data");
			return false;
		}

		try {
			SCORM_CONNECTION.set("cmi.suspend_data", JSON.stringify(suspendData));

			const locationData = `activityId=${Object.keys(suspendData).join(
				","
			)}&ts=${Date.now()}`;
			SCORM_CONNECTION.set("cmi.core.lesson_location", locationData);

			SCORM_CONNECTION.set("cmi.core.exit", "suspend");

			const sessionTime = formatSessionTime(30 * 60 * 1000);
			SCORM_CONNECTION.set("cmi.core.session_time", sessionTime);

			const status = SCORM_CONNECTION.get("cmi.core.lesson_status");
			if (status !== "completed" && status !== "passed") {
				SCORM_CONNECTION.set("cmi.core.lesson_status", "incomplete");
			}

			const commitSuccess = await commitData();

			const savedData = SCORM_CONNECTION.get("cmi.suspend_data");
			if (!savedData || savedData === "{}") {
				logger.warn("Data was not correctly persisted in suspend_data");
				return false;
			}

			return commitSuccess;
		} catch (error) {
			logger.error("Error saving suspend_data:", error);
			return false;
		}
	}, [apiConnected, suspendData, commitData, logger]);

	const closeScormAPIConnection = useCallback(() => {
		if (!apiConnected) return;

		setSuspendData();
		SCORM_CONNECTION.status("set", completionStatus);
		SCORM_CONNECTION.save();

		if (SCORM_CONNECTION.quit()) {
			setApiConnected(false);
			setLearnerName("unknown");
			setCompletionStatus("unknown");
			setSuspendDataState({});
			setScormVersion("");
		} else {
			logger.error("ScormProvider error: could not close the API connection");
		}
	}, [apiConnected, completionStatus, logger, setSuspendData]);

	useEffect(() => {
		const result = createScormAPIConnection();

		if (!result.success) {
			logger.error("SCORM connection failed:", result.errorMessage);
		}

		window.addEventListener("beforeunload", closeScormAPIConnection);
		return () => {
			closeScormAPIConnection();
			window.removeEventListener("beforeunload", closeScormAPIConnection);
		};
	}, [createScormAPIConnection, closeScormAPIConnection, logger]);

	const clearSuspendData = useCallback(() => setSuspendDataState({}), []);

	const setStatus = useCallback(
		(status: string) => {
			if (!apiConnected) return;
			setCompletionStatus(status);
			SCORM_CONNECTION.status("set", status);
		},
		[apiConnected]
	);

	const setScore = useCallback(
		async (score: Score): Promise<any> => {
			if (!apiConnected) {
				return Promise.reject(new Error("SCORM API not connected"));
			}

			try {
				SCORM_CONNECTION.set("cmi.score.raw", score.value);

				if (scormVersion === "2004") {
					SCORM_CONNECTION.set("cmi.score.min", score.min);
					SCORM_CONNECTION.set("cmi.score.max", score.max);
				} else if (scormVersion === "1.2") {
					SCORM_CONNECTION.set("cmi.core.score.min", score.min);
					SCORM_CONNECTION.set("cmi.core.score.max", score.max);
				}

				if (score.status && score.status !== "0") {
					setStatus(score.status);
				}

				const saveResult = SCORM_CONNECTION.save();

				return Promise.resolve({
					success: true,
					saveResult,
					score,
				});
			} catch (error) {
				return Promise.reject(error);
			}
		},
		[apiConnected, scormVersion, setStatus]
	);

	const set = useCallback(
		(key: string, value: any) => {
			if (!apiConnected) return;
			SCORM_CONNECTION.set(key, value);
		},
		[apiConnected]
	);

	const get = useCallback(
		(key: string) => {
			if (!apiConnected) return null;
			return SCORM_CONNECTION.get(key);
		},
		[apiConnected]
	);

	useEffect(() => {
		if (!apiConnected || !autoCommit) return;

		const commitInterval =
			typeof autoCommit === "object" && autoCommit.interval
				? autoCommit.interval
				: 60000;

		const autoCommitTimer = setInterval(() => {
			logger.log("Auto commit triggered by interval");
			commitData();
		}, commitInterval);

		return () => clearInterval(autoCommitTimer);
	}, [apiConnected, autoCommit, commitData, logger]);

	useEffect(() => {
		if (!apiConnected || !autoCommit) return;

		if (typeof autoCommit === "object" && autoCommit.onStateChange) {
			logger.log("Auto commit triggered by state change");
			commitData();
		}
	}, [apiConnected, autoCommit, suspendData, commitData, logger]);

	return (
		<ScoContext.Provider
			value={{
				apiConnected,
				learnerName,
				completionStatus,
				suspendData,
				scormVersion,
				getSuspendData,
				setSuspendData,
				clearSuspendData,
				setStatus,
				setScore,
				set,
				get,
				commitData,
			}}
		>
			{children}
		</ScoContext.Provider>
	);
};

export const useScorm = (): IScormContextProps => {
	const context = React.useContext(ScoContext);
	if (!context) {
		throw new Error("useScorm must be used within a ScormProvider");
	}
	return context;
};

export default ScormProvider;
