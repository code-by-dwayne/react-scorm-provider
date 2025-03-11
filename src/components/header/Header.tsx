import React from "react";
import logo from "../../img/rsp-logo.png";
import s4logo from "../../img/s4-logo.png";
import { useLanguage } from "@/context/languageContext";

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="header">
      <div className="row">
        <div className="three columns logo">
          <img src={logo} alt="React Scorm Provider Logo" className="u-max-full-width" />
        </div>
        <div className="nine columns">
          <h1>{t("appTitle")}</h1>
          <div className="sponsor-info">
            <p>{t("presentedBy")}</p>
            <a href="https://s4netquest.com">
              <img src={s4logo} alt="S4 NetQuest Logo" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
