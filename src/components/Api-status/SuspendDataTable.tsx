import React from "react";
import { useLanguage } from "@/context/languageContext";

interface SuspendDataTableProps {
  suspendData: { [key: string]: string };
}

const SuspendDataTable: React.FC<SuspendDataTableProps> = ({ suspendData }) => {
  const { t } = useLanguage();

  const getKeyDescription = (key: string) => {
    if (key === "lastPage") return t("lastPage");
    if (key.startsWith("question")) return t("savedAnswer");
    if (key === "progress") return t("progressPercentage");
    if (key === "preferences") return t("userSettings");
    return "";
  };

  return (
    <>
      <p>{t("suspendDataStored")}</p>
      <div className="info-box">
        <p><strong>{t("viewingSuspendData")}</strong></p>
      </div>

      {Object.keys(suspendData).length > 0 ? (
        <table className="u-full-width">
          <thead>
            <tr>
              <th>{t("key")}</th>
              <th>{t("value")}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(suspendData).map((key) => (
              <tr key={key}>
                <td>
                  <code>{key}</code>
                  {getKeyDescription(key) && (
                    <small className="description"> - {getKeyDescription(key)}</small>
                  )}
                </td>
                <td><code>{suspendData[key]}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>{t("noSuspendData")}</p>
          <small>{t("useSuspendDataForm")}</small>
        </div>
      )}
    </>
  );
};

export default SuspendDataTable;
