import React from "react";
import { useLanguage } from "@/context/languageContext";

interface Score {
  value: number;
  min: number;
  max: number;
  status: string;
}

interface ScoreFormProps {
  score: Score;
  setScore: React.Dispatch<React.SetStateAction<Score>>;
  setScoreApi: (score: Score) => Promise<any>;
}

const ScoreForm: React.FC<ScoreFormProps> = ({ score, setScore, setScoreApi }) => {
  const { t } = useLanguage();

  const onScoreChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    setScore((prev) => ({
      ...prev,
      [field]: field === "status" ? value : Number(value),
    }));
  };

  const handleScoreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (score.status === "0") return;
    setScoreApi(score)
      .then((res) => alert(`Successfully set the score: ${JSON.stringify(res)}`))
      .catch(() => alert("Something went wrong... score not set."));
  };

  const statuses = [
    { value: "passed", translationKey: "passed" },
    { value: "completed", translationKey: "completed" },
    { value: "failed", translationKey: "failed" },
    { value: "incomplete", translationKey: "incomplete" },
    { value: "browsed", translationKey: "browsed" },
    { value: "not attempted", translationKey: "notAttempted" }
  ];

  return (
    <>
      <p>{t("sendScore")}</p>
      <div className="info-box">
        <p><strong>{t("aboutScormScore")}</strong></p>
      </div>
      <form onSubmit={handleScoreSubmit}>
        <div className="row">
          <div key="value" className="three columns">
            <label htmlFor="value">{t("scoreValue")}</label>
            <input
              type="number"
              className="u-full-width"
              name="value"
              value={score.value}
              placeholder={t("scoreValue")}
              onChange={onScoreChange}
            />
            <small className="form-help">{t("scoreValueHint")}</small>
          </div>
          <div key="min" className="three columns">
            <label htmlFor="min">{t("scoreMin")}</label>
            <input
              type="number"
              className="u-full-width"
              name="min"
              value={score.min}
              placeholder={t("scoreMin")}
              onChange={onScoreChange}
            />
            <small className="form-help">{t("scoreMinHint")}</small>
          </div>
          <div key="max" className="three columns">
            <label htmlFor="max">{t("scoreMax")}</label>
            <input
              type="number"
              className="u-full-width"
              name="max"
              value={score.max}
              placeholder={t("scoreMax")}
              onChange={onScoreChange}
            />
            <small className="form-help">{t("scoreMaxHint")}</small>
          </div>
          <div className="three columns">
            <label htmlFor="status">{t("scoreStatus")}</label>
            <select className="u-full-width" name="status" value={score.status} onChange={onScoreChange}>
              <option disabled value="0">
                -- {t("scoreStatus")} --
              </option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {t(status.translationKey)}
                </option>
              ))}
            </select>
            <small className="form-help">{t("scoreStatusHint")}</small>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="button-primary" disabled={score.status === "0"}>
            {t("submitScore")}
          </button>
          <small className="help-text">
            {t("scoreSubmitHint")}
          </small>
        </div>
      </form>
    </>
  );
};

export default ScoreForm;
