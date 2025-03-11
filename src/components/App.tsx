import React from "react";
import { LanguageProvider } from "../context/languageContext";
import { ScormProvider } from "../lib/index";
import ApiStatus from "./Api-status/ApiStatus";
import DemoSection from "./Demo-Section/DemoSection";
import Header from "./header/Header";
import Introduction from "./Introduction/Introduction";
import LanguageSelector from "./lang-select";
import Learner from "./Learner";
import ScormComponents from "./Scorm/ScormComponents";
import ScormExample from "./Scorm/ScormExample";
import ScormInfo from "./Scorm/ScormInfo";

const App: React.FC = () => {
  return (
    <LanguageProvider defaultLanguage="en">
      <ScormProvider>
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
        <div id="main-content-container" className="container">
          <Header />
          <Introduction />
          <ScormInfo />
          <ScormComponents />
          <ScormExample />
          <DemoSection />
          <Learner />
          <ApiStatus />
        </div>
      </ScormProvider>
    </LanguageProvider>
  );
};

export default App;
