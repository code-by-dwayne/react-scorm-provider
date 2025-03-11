import React from "react";
import { useLanguage } from "@/context/languageContext";

const DemoSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h2>{t("workingDemo")}</h2>
      <p>
        {t("demoText1")}
      </p>
      <p>
        {t("demoText2")}
        <a href="https://github.com/S4-NetQuest/react-scorm-provider" target="__blank" rel="noreferrer noopener">
          documentation
        </a> for more information.
      </p>
    </section>
  );
};

export default DemoSection;
