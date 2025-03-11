import { useLanguage } from "@/context/languageContext";
import React from "react";

interface StatusButtonsProps {
  setStatus: (status: string) => void;
}

const StatusButtons: React.FC<StatusButtonsProps> = ({ setStatus }) => {
  const { t } = useLanguage();

  const statuses = [
    { value: "passed", translationKey: "passed" },
    { value: "completed", translationKey: "completed" },
    { value: "failed", translationKey: "failed" },
    { value: "incomplete", translationKey: "incomplete" },
    { value: "browsed", translationKey: "browsed" },
    { value: "not attempted", translationKey: "notAttempted" }
  ];

  const statusDescKeys = {
    "passed": "passedDesc",
    "completed": "completedDesc",
    "failed": "failedDesc",
    "incomplete": "incompleteDesc",
    "browsed": "browsedDesc",
    "not attempted": "notAttemptedDesc"
  };

  return (
    <>
      <p>{t("sendNewStatus")}</p>
      <div className="info-box">
        <p><strong>{t("aboutScormStatus")}</strong></p>
      </div>

      <div className="status-grid">
        {statuses.map((status) => (
          <div key={status.value} className="status-item">
            <button className="button" onClick={() => setStatus(status.value)}>
              {t(status.translationKey)}
            </button>
            <small className="status-description">
              {t(statusDescKeys[status.value])}
            </small>
          </div>
        ))}
      </div>

      <div className="usage-note">
        <p>
          <strong>{t("howToUseStatus")}</strong>
        </p>
      </div>
    </>
  );
};

export default StatusButtons;
