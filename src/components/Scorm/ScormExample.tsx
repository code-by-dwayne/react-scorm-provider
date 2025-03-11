import React from "react";
import { useLanguage } from "@/context/languageContext";

const ScormExample: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h2>{t("fullExampleCode")}</h2>
      <pre>
        <code style={{ whiteSpace: "pre-wrap" }}>{`
// Example legacy code whithScorm
import React from 'react';
import ScormProvider, { withScorm } from 'react-scorm-provider';

const Learner = (props) => {
  return (
    <div>
      <p>Welcome, {props.sco.learnerName}!</p>
      <p>Your course status is currently: {props.sco.completionStatus}</p>
      <button onClick={() => props.sco.setStatus('completed')}>Mark me complete!</button>
    </div>
  );
};

const ScoLearner = withScorm()(Learner);

const App = () => {
  return (
    <ScormProvider>
      <h1>SCORM Connection Established!</h1>
      <ScoLearner />
    </ScormProvider>
  );
};

export default App;
      `}</code>
      </pre>
    </section>
  );
};

export default ScormExample;
