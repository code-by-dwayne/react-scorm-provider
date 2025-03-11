import React, { createContext, useEffect, useState, useCallback, ReactNode } from "react";
import { SCORM, debug } from "pipwerks-scorm-api-wrapper";
import { Score } from ".";

// Define Score interface
interface ScormContextProps {
  apiConnected: boolean;
  learnerName: string;
  completionStatus: string;
  suspendData: Record<string, any>;
  scormVersion: string;
  getSuspendData: () => Promise<void>;
  setSuspendData: () => void;
  clearSuspendData: () => void;
  setStatus: (status: string) => void;
  setScore: (score: Score) => Promise<any>;
  set: (key: string, value: any) => void;
  get: (key: string) => any;
}

export const ScoContext = createContext<ScormContextProps | undefined>(undefined);

interface ScormProviderProps {
  children: ReactNode;
  version?: "1.2" | "2004";
  debug?: boolean;
}

const ScormProvider: React.FC<ScormProviderProps> = ({ children, version, debug: isDebug }) => {
  const [apiConnected, setApiConnected] = useState(false);
  const [learnerName, setLearnerName] = useState("unknown");
  const [completionStatus, setCompletionStatus] = useState("unknown");
  const [suspendData, setSuspendDataState] = useState<Record<string, any>>({});
  const [scormVersion, setScormVersion] = useState<string>("");

  useEffect(() => {
    createScormAPIConnection();
    window.addEventListener("beforeunload", closeScormAPIConnection);
    return () => {
      closeScormAPIConnection();
      window.removeEventListener("beforeunload", closeScormAPIConnection);
    };
  }, []);

  const createScormAPIConnection = useCallback(() => {
    if (apiConnected) return;

    if (version) SCORM.version = version;
    if (typeof isDebug === "boolean") debug.isActive = isDebug;

    if (SCORM.init()) {
      const version = SCORM.version;
      const learner = version === "1.2" ? SCORM.get("cmi.core.student_name") : SCORM.get("cmi.learner_name");
      const status = SCORM.status("get");

      setApiConnected(true);
      setLearnerName(learner || "unknown");
      setCompletionStatus(status || "unknown");
      setScormVersion(version);
      getSuspendData();
    } else {
      console.error("ScormProvider init error: could not create the SCORM API connection");
    }
  }, [apiConnected, version, isDebug]);

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

  const getSuspendData = useCallback(async () => {
    if (!apiConnected) throw new Error("SCORM API not connected");

    const data = SCORM.get("cmi.suspend_data");
    setSuspendDataState(data ? JSON.parse(data) : {});
  }, [apiConnected]);

  const setSuspendData = useCallback(() => {
    if (!apiConnected) return;
    SCORM.set("cmi.suspend_data", JSON.stringify(suspendData));
  }, [apiConnected, suspendData]);

  const clearSuspendData = useCallback(() => setSuspendDataState({}), []);

  const setStatus = useCallback((status: string) => {
    if (!apiConnected) return;
    setCompletionStatus(status);
    SCORM.status("set", status);
  }, [apiConnected]);

  const setScore = useCallback(async (score: Score): Promise<any> => {
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
        score
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }, [apiConnected, scormVersion, setStatus]);

  const set = useCallback((key: string, value: any) => {
    if (!apiConnected) return;
    SCORM.set(key, value);
  }, [apiConnected]);

  const get = useCallback((key: string) => {
    if (!apiConnected) return null;
    return SCORM.get(key);
  }, [apiConnected]);

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
      }}
    >
      {children}
    </ScoContext.Provider>
  );
};

export const useScorm = (): ScormContextProps => {
  const context = React.useContext(ScoContext);
  if (!context) {
    throw new Error("useScorm must be used within a ScormProvider");
  }
  return context;
};

export default ScormProvider;
