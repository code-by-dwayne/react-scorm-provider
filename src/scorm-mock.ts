interface ScormData {
  "cmi.core.student_id": string;
  "cmi.core.student_name": string;
  "cmi.core.lesson_location": string;
  "cmi.core.lesson_status": string;
  "cmi.suspend_data": string;
}

/**
 * Interface para definir os métodos da API SCORM Fake
 */
interface ScormAPI {
  LMSInitialize(): string;
  LMSCommit(): string;
  LMSFinish(): string;
  LMSGetValue(model: keyof ScormData): string;
  LMSSetValue(model: keyof ScormData, value: string): string;
  LMSGetLastError(): string;
  LMSGetErrorString(errorCode: string): string;
  LMSGetDiagnostic(errorCode: string): string;
}

/**
 * Simulação de uma API SCORM (Fake API)
 * Permite interações com os dados do aluno sem precisar de um LMS real
 */
const ScormMock = (function (): ScormAPI {
  let data: ScormData = {
    "cmi.core.student_id": "000100",
    "cmi.core.student_name": "Student, Joe",
    "cmi.core.lesson_location": "",
    "cmi.core.lesson_status": "not attempted",
    "cmi.suspend_data": "",
  };

  return {
    LMSInitialize: () => "true",

    LMSCommit: () => "true",

    LMSFinish: () => "true",

    LMSGetValue: (model: keyof ScormData) => data[model] || "",

    LMSSetValue: (model: keyof ScormData, value: string) => {
      data[model] = value;
      return "true";
    },

    LMSGetLastError: () => "0",

    LMSGetErrorString: () => "No error",

    LMSGetDiagnostic: () => "No error",
  };
})();

(window as any).API = ScormMock;

export default ScormMock;
