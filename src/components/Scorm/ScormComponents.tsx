import React from "react";
import { useLanguage } from "@/context/languageContext";

const ScormComponents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h3>{t("withScormTitle")}</h3>
      <p>
        <code>const YourEnhancedComponent = withScorm()(YourComponent)</code>
      </p>
      <p>
        {t("withScormDesc").split('sco')[0]}
        <code>sco</code>
        {t("withScormDesc").split('sco')[1]}
      </p>
    </section>
  );
};

export default ScormComponents;
