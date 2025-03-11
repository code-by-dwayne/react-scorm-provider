import React, { useState } from "react";
import { useLanguage } from "@/context/languageContext";

/**
 * Propriedades do componente SuspendDataForm.
 */
interface SuspendDataFormProps {
  /**
   * Função para armazenar dados no SCORM Suspend Data.
   * @param key - Chave associada ao valor armazenado.
   * @param value - Valor a ser armazenado.
   */
  setSuspendData: (key: string, value: string) => void;
}

/**
 * Componente responsável por adicionar novos dados ao SCORM Suspend Data.
 * Suspend Data é uma área de armazenamento persistente usada para salvar o progresso
 * do aluno dentro de um curso SCORM.
 */
const SuspendDataForm: React.FC<SuspendDataFormProps> = ({ setSuspendData }) => {
  const { t } = useLanguage();
  const [suspendPair, setSuspendPair] = useState({ key: "", val: "" });

  /**
   * Manipula o envio do formulário, armazenando um novo par chave/valor no Suspend Data.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!suspendPair.key.trim() || !suspendPair.val.trim()) return;
    setSuspendData(suspendPair.key, suspendPair.val);
    setSuspendPair({ key: "", val: "" });
  };

  const examples = [
    { key: "lastPage", value: "module3/page7", descKey: "lastPage" },
    { key: "question1", value: "optionB", descKey: "savedAnswer" },
    { key: "progress", value: "65", descKey: "progressPercentage" },
    { key: "preferences", value: "darkMode:true,fontSize:large", descKey: "userSettings" }
  ];

  return (
    <>
      <h4>{t("scormSuspendData")}</h4>
      <div className="info-box">
        <p>
          <strong>{t("whatIsSuspendData")}</strong>
        </p>
        <p>
          <strong>{t("suspendDataLimitation")}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="suspendKey">{t("key")}</label>
            <input
              id="suspendKey"
              className="u-full-width"
              type="text"
              value={suspendPair.key}
              placeholder="lastPage"
              onChange={(e) => setSuspendPair({ ...suspendPair, key: e.target.value })}
            />
            <small className="form-help">{t("keyHint")}</small>
          </div>
          <div className="six columns">
            <label htmlFor="suspendValue">{t("value")}</label>
            <input
              id="suspendValue"
              className="u-full-width"
              type="text"
              value={suspendPair.val}
              placeholder="page5"
              onChange={(e) => setSuspendPair({ ...suspendPair, val: e.target.value })}
            />
            <small className="form-help">{t("valueHint")}</small>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="button-primary">
            {t("saveData")}
          </button>
        </div>
      </form>

      <div className="examples-section">
        <h5>{t("examplesOfUse")}</h5>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>{t("key")}</th>
              <th>{t("value")}</th>
              <th>{t("usage")}</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example, index) => (
              <tr key={index}>
                <td><code>{example.key}</code></td>
                <td><code>{example.value}</code></td>
                <td>{t(example.descKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="technical-note">
          <strong>{t("technicalNote")}</strong>
        </p>
      </div>
    </>
  );
};

export default SuspendDataForm;
