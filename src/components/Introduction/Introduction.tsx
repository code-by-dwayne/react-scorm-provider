import React from "react";
import { useLanguage } from "@/context/languageContext";

const Introduction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h2>{t("whatIsThis")}</h2>
      <p>
        React-scorm-provider (RSP) {t("introText1ParaSimple")}
        <a href="https://scorm.com/scorm-explained/" target="__blank" rel="noreferrer noopener">SCORM API</a> {t("introText1ParaSimple2")}
        <a href="https://github.com/pipwerks/scorm-api-wrapper" target="__blank" rel="noreferrer noopener">pipwerks</a>.
      </p>
      <p>
        {t("introText2ParaSimple")}
        <a href="https://github.com/lmihaidaniel/simple-scorm-packager" target="__blank" rel="noreferrer noopener">
          simple-scorm-packager
        </a>.
      </p>
      <p>{t("introText3")}</p>
    </section>
  );
};

export default Introduction;
