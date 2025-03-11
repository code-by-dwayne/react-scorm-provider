import { useLanguage } from "@/context/languageContext";
import { useScorm } from "@/lib/ScormProvider";
import React, { useState } from "react";
import ScoreForm from "./ScoreForm";
import StatusButtons from "./StatusButtons";
import SuspendDataForm from "./SuspendDataForm";
import SuspendDataTable from "./SuspendDataTable";

interface Score {
  value: number;
  min: number;
  max: number;
  status: string;
}

const ApiStatus: React.FC<any> = () => {
  const { setStatus, apiConnected, completionStatus, scormVersion, suspendData, setSuspendData, setScore: setScoreApi } = useScorm();

  const { t } = useLanguage();

  const [score, setScore] = useState<Score>({ value: 0, min: 0, max: 100, status: "0" });

  return (
    <section className="section">
      <h3>{t("scormInfoStatus")}</h3>
      <p>{t("scormVersion")} {scormVersion}</p>
      <p>{apiConnected ? t("apiConnected") : t("apiNotConnected")}</p>
      <p>{t("completionStatus")} {completionStatus}</p>

      <SuspendDataTable suspendData={suspendData} />

      <hr />
      <StatusButtons setStatus={setStatus} />

      <hr />
      <SuspendDataForm setSuspendData={setSuspendData} />

      <hr />
      <ScoreForm score={score} setScore={setScore} setScoreApi={setScoreApi} />
    </section>
  );
};

export default ApiStatus;
