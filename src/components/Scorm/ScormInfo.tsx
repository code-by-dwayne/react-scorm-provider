import React from "react";
import { useLanguage } from "@/context/languageContext";

const ScormInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h2>{t("theComponents")}</h2>
      <h3>{t("scormProviderTitle")}</h3>
      <p><code>{'<ScormProvider></ScormProvider>'}</code></p>
      <p>{t("scormProviderDesc")}</p>
    </section>
  );
};

export default ScormInfo;
