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

export const ScoContext = createContext<IScormContextProps | undefined>(
	undefined
);

interface ScormProviderProps {
	children: ReactNode;
	version?: "1.2" | "2004";
	debug?: boolean;
}

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
	version,
	debug: isDebug,
}) => {
	const [apiConnected, setApiConnected] = useState(false);
	const [learnerName, setLearnerName] = useState("unknown");
	const [completionStatus, setCompletionStatus] = useState("unknown");
	const [suspendData, setSuspendDataState] = useState<Record<string, any>>({});
	const [scormVersion, setScormVersion] = useState<string>("");

	const getSuspendData = useCallback(async () => {
		if (!apiConnected) {
			throw new Error("SCORM API não conectada");
		}

		try {
			const data = SCORM.get("cmi.suspend_data");
			let parsedData = {};

			if (data && data !== "{}") {
				try {
					parsedData = JSON.parse(data);
					console.log("Dados recuperados de suspend_data com sucesso");
				} catch (e) {
					console.warn("Erro ao processar dados de suspend_data:", e);
				}
			} else {
				console.warn("Nenhum dado encontrado em suspend_data");

				const locationData = SCORM.get("cmi.core.lesson_location");
				if (locationData && locationData.includes("activityId=")) {
					console.log(
						"Encontrado identificador em lesson_location:",
						locationData
					);
				}
			}

			const status = SCORM.get("cmi.core.lesson_status");
			if (status === "completed" || status === "passed") {
				console.log("Atividade já marcada como concluída no LMS");

				const score = SCORM.get("cmi.core.score.raw");
				if (score) {
					console.log("Pontuação recuperada:", score);
				}
			}

			setSuspendDataState(parsedData);
			return true;
		} catch (error) {
			console.error("Erro ao carregar suspend_data:", error);
			return false;
		}
	}, [apiConnected]);

	const createScormAPIConnection = useCallback((): {
		success: boolean;
		errorMessage?: string;
	} => {
		if (apiConnected) return { success: true };

		if (typeof window === "undefined") {
			return {
				success: false,
				errorMessage: "O ambiente não é compatível com SCORM.",
			};
		}

		try {
			if (version) SCORM.version = version;
			if (typeof isDebug === "boolean") debug.isActive = isDebug;

			const API = SCORM.API.getHandle();
			if (!API) {
				return {
					success: false,
					errorMessage:
						"API SCORM não encontrada no LMS. Verifique se o conteúdo está sendo executado dentro de um LMS compatível.",
				};
			}

			if (SCORM.init()) {
				const scormVersion = SCORM.version;
				const learner =
					scormVersion === "1.2"
						? SCORM.get("cmi.core.student_name")
						: SCORM.get("cmi.learner_name");
				const status = SCORM.status("get");

				setApiConnected(true);
				setLearnerName(learner || "unknown");
				setCompletionStatus(status || "unknown");
				setScormVersion(scormVersion);
				getSuspendData();

				console.log(
					`Conexão SCORM estabelecida com sucesso (versão: ${scormVersion})`
				);
				return { success: true };
			} else {
				let errorCode = "Desconhecido";
				let errorString = "Erro não especificado";

				try {
					if (SCORM.version === "1.2" && API.LMSGetLastError) {
						errorCode = API.LMSGetLastError();
						errorString = API.LMSGetErrorString(errorCode);
					} else if (SCORM.version === "2004" && API.GetLastError) {
						errorCode = API.GetLastError();
						errorString = API.GetErrorString(errorCode);
					}
				} catch (e) {
					console.warn("Não foi possível obter detalhes do erro:", e);
				}

				const errorMessage = `Falha na conexão com o LMS. Código de erro: ${errorCode}. Descrição: ${errorString}`;
				console.error(errorMessage);

				return { success: false, errorMessage };
			}
		} catch (error) {
			const errorMessage = `Erro inesperado ao conectar com o LMS: ${
				error instanceof Error ? error.message : String(error)
			}`;
			console.error(errorMessage);
			return { success: false, errorMessage };
		}
	}, [apiConnected, version, isDebug, getSuspendData]);

	const closeScormAPIConnection = useCallback(() => {
		if (!apiConnected) return;

		setSuspendData();
		SCORM.status("set", completionStatus);
		SCORM.save();

		if (SCORM.quit()) {
			setApiConnected(false);
			setLearnerName("unknown");
			setCompletionStatus("unknown");
			setSuspendDataState({});
			setScormVersion("");
		} else {
			console.error("ScormProvider error: could not close the API connection");
		}
	}, [apiConnected, completionStatus]);

	useEffect(() => {
		const result = createScormAPIConnection();

		if (!result.success) {
			console.error("Falha na conexão SCORM:", result.errorMessage);
		}

		window.addEventListener("beforeunload", closeScormAPIConnection);
		return () => {
			closeScormAPIConnection();
			window.removeEventListener("beforeunload", closeScormAPIConnection);
		};
	}, []);

	/**
	 * @description Saves all current student progress to the LMS without ending the session (LMSCommit)
	 * @example
	 * commitData();
	 * @returns {Promise<any>} A promise that resolves with the result of the save operation
	 * @throws {Error} If the SCORM API is not connected
	 */
	const commitData = useCallback(async (): Promise<boolean> => {
		if (!apiConnected) {
			return Promise.reject(new Error("SCORM API não conectada"));
		}

		try {
			const exitMode = SCORM.get("cmi.core.exit");
			if (!exitMode || exitMode !== "suspend") {
				SCORM.set("cmi.core.exit", "suspend");
			}

			let success = false;

			if (typeof SCORM.save === "function") {
				success = SCORM.save() !== "false";
			}

			if (!success && SCORM.version === "1.2") {
				try {
					success = SCORM.API.LMSCommit("") !== "false";
				} catch (e) {
					console.warn("Erro ao tentar LMSCommit direto:", e);
				}
			}

			const suspendData = SCORM.get("cmi.suspend_data");
			if (!suspendData || suspendData === "{}") {
				console.warn("Commit não persistiu dados em suspend_data");
			}

			return success;
		} catch (error) {
			console.error("Erro no commit:", error);
			return false;
		}
	}, [apiConnected]);

	const setSuspendData = useCallback(async () => {
		if (!apiConnected) {
			console.warn("SCORM API não conectada, impossível salvar dados");
			return false;
		}

		try {
			SCORM.set("cmi.suspend_data", JSON.stringify(suspendData));

			const locationData = `activityId=${Object.keys(suspendData).join(
				","
			)}&ts=${Date.now()}`;
			SCORM.set("cmi.core.lesson_location", locationData);

			SCORM.set("cmi.core.exit", "suspend");

			const sessionTime = formatSessionTime(30 * 60 * 1000);
			SCORM.set("cmi.core.session_time", sessionTime);

			const status = SCORM.get("cmi.core.lesson_status");
			if (status !== "completed" && status !== "passed") {
				SCORM.set("cmi.core.lesson_status", "incomplete");
			}

			const commitSuccess = await commitData();

			const savedData = SCORM.get("cmi.suspend_data");
			if (!savedData || savedData === "{}") {
				console.warn(
					"Dados não foram persistidos corretamente no suspend_data"
				);
				return false;
			}

			return commitSuccess;
		} catch (error) {
			console.error("Erro ao salvar suspend_data:", error);
			return false;
		}
	}, [apiConnected, suspendData, commitData]);

	const clearSuspendData = useCallback(() => setSuspendDataState({}), []);

	const setStatus = useCallback(
		(status: string) => {
			if (!apiConnected) return;
			setCompletionStatus(status);
			SCORM.status("set", status);
		},
		[apiConnected]
	);

	const setScore = useCallback(
		async (score: Score): Promise<any> => {
			if (!apiConnected) {
				return Promise.reject(new Error("SCORM API not connected"));
			}

			try {
				SCORM.set("cmi.score.raw", score.value);

				if (scormVersion === "2004") {
					SCORM.set("cmi.score.min", score.min);
					SCORM.set("cmi.score.max", score.max);
				} else if (scormVersion === "1.2") {
					SCORM.set("cmi.core.score.min", score.min);
					SCORM.set("cmi.core.score.max", score.max);
				}

				if (score.status && score.status !== "0") {
					setStatus(score.status);
				}

				const saveResult = SCORM.save();

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
			SCORM.set(key, value);
		},
		[apiConnected]
	);

	const get = useCallback(
		(key: string) => {
			if (!apiConnected) return null;
			return SCORM.get(key);
		},
		[apiConnected]
	);

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
