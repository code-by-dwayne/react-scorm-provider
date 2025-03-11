// translations.ts
// Arquivo central de traduções para a aplicação

export type Language = 'en' | 'pt' | 'es';

export interface Translations {
  [key: string]: {
    en: string;
    pt: string;
    es: string;
  };
}

// Traduções gerais da aplicação
export const translations: Translations = {
  // Header.tsx
  "appTitle": {
    en: "React SCORM Provider",
    pt: "Provedor SCORM para React",
    es: "Proveedor SCORM para React"
  },
  "presentedBy": {
    en: "Presented by:",
    pt: "Apresentado por:",
    es: "Presentado por:"
  },

  // Introduction.tsx
  "whatIsThis": {
    en: "What is this?",
    pt: "O que é isto?",
    es: "¿Qué es esto?"
  },
  "introText1": {
    en: "React-scorm-provider (RSP) is a set of React Components that simplify the inclusion of the SCORM API into your React projects. It utilizes the SCORM API wrapper from pipwerks.",
    pt: "React-scorm-provider (RSP) é um conjunto de Componentes React que simplificam a inclusão da API SCORM em seus projetos React. Ele utiliza o wrapper da API SCORM do pipwerks.",
    es: "React-scorm-provider (RSP) es un conjunto de Componentes React que simplifican la inclusión de la API SCORM en sus proyectos React. Utiliza el contenedor de API SCORM de pipwerks."
  },
  "introText2": {
    en: "This project does not include SCORM packaging. For SCORM packaging, check out simple-scorm-packager.",
    pt: "Este projeto não inclui empacotamento SCORM. Para empacotamento SCORM, confira o simple-scorm-packager.",
    es: "Este proyecto no incluye empaquetado SCORM. Para empaquetado SCORM, consulte simple-scorm-packager."
  },
  "introText3": {
    en: "There are two major components of RSP, ScormProvider and withScorm.",
    pt: "Existem dois componentes principais do RSP, ScormProvider e withScorm.",
    es: "Hay dos componentes principales de RSP, ScormProvider y withScorm."
  },

  "introText1Extra": {
    en: "into your React projects. It utilizes the SCORM API wrapper from",
    pt: "em seus projetos React. Ele utiliza o wrapper da API SCORM do",
    es: "en sus proyectos React. Utiliza el contenedor de API SCORM de"
  },

  "introText1ParaSimple": {
    en: "is a set of React Components that simplify the inclusion of the",
    pt: "é um conjunto de Componentes React que simplificam a inclusão da",
    es: "es un conjunto de Componentes React que simplifican la inclusión de la"
  },
  "introText1ParaSimple2": {
    en: "into your React projects. It utilizes the SCORM API wrapper from",
    pt: "em seus projetos React. Ele utiliza o wrapper da API SCORM do",
    es: "en sus proyectos React. Utiliza el contenedor de API SCORM de"
  },
  "introText2ParaSimple": {
    en: "This project does not include SCORM packaging. For SCORM packaging, check out",
    pt: "Este projeto não inclui empacotamento SCORM. Para empacotamento SCORM, confira o",
    es: "Este proyecto no incluye empaquetado SCORM. Para empaquetado SCORM, consulte"
  },

  // ScormInfo.tsx
  "theComponents": {
    en: "The Components:",
    pt: "Os Componentes:",
    es: "Los Componentes:"
  },
  "scormProviderTitle": {
    en: "ScormProvider",
    pt: "ScormProvider",
    es: "ScormProvider"
  },
  "scormProviderDesc": {
    en: "A wrapper component that should be included once in your React application. It automatically establishes a connection to the SCORM API.",
    pt: "Um componente wrapper que deve ser incluído uma vez em sua aplicação React. Ele estabelece automaticamente uma conexão com a API SCORM.",
    es: "Un componente envolvente que debe incluirse una vez en su aplicación React. Establece automáticamente una conexión con la API SCORM."
  },

  // ScormComponents.tsx
  "withScormTitle": {
    en: "withScorm Higher Order Component",
    pt: "Componente de Ordem Superior withScorm",
    es: "Componente de Orden Superior withScorm"
  },
  "withScormDesc": {
    en: "This HOC provides access to SCORM properties and functions. All SCORM-related data is passed to the enhanced component via the sco prop.",
    pt: "Este HOC fornece acesso a propriedades e funções do SCORM. Todos os dados relacionados ao SCORM são passados para o componente aprimorado através da prop sco.",
    es: "Este HOC proporciona acceso a propiedades y funciones SCORM. Todos los datos relacionados con SCORM se pasan al componente mejorado a través de la prop sco."
  },

  // ScormExample.tsx
  "fullExampleCode": {
    en: "Full Example Code:",
    pt: "Código de Exemplo Completo:",
    es: "Código de Ejemplo Completo:"
  },

  // DemoSection.tsx
  "workingDemo": {
    en: "Working Demonstration",
    pt: "Demonstração Funcional",
    es: "Demostración Funcional"
  },
  "demoText1": {
    en: "This demo website has RSP integrated. However, this is a website, not a SCORM package. A mock SCORM API has been included to respond to API calls.",
    pt: "Este site de demonstração tem o RSP integrado. No entanto, este é um site, não um pacote SCORM. Uma API SCORM simulada foi incluída para responder às chamadas de API.",
    es: "Este sitio web de demostración tiene RSP integrado. Sin embargo, este es un sitio web, no un paquete SCORM. Se ha incluido una API SCORM simulada para responder a las llamadas de API."
  },
  "demoText2": {
    en: "Check the sections below for basic values retrieved from the API and buttons that set values. See the documentation for more information.",
    pt: "Verifique as seções abaixo para valores básicos recuperados da API e botões que definem valores. Consulte a documentação para mais informações.",
    es: "Consulte las secciones a continuación para ver valores básicos recuperados de la API y botones que establecen valores. Consulte la documentación para obtener más información."
  },

  // Learner.tsx
  "learnerInfo": {
    en: "Learner Information Retrieved from the mock API:",
    pt: "Informações do Aluno Recuperadas da API simulada:",
    es: "Información del Estudiante Recuperada de la API simulada:"
  },
  "studentName": {
    en: "student_name:",
    pt: "nome_do_aluno:",
    es: "nombre_del_estudiante:"
  },

  // ApiStatus.tsx
  "scormInfoStatus": {
    en: "SCORM Information and Status",
    pt: "Informações e Status do SCORM",
    es: "Información y Estado de SCORM"
  },
  "scormVersion": {
    en: "SCORM version:",
    pt: "Versão do SCORM:",
    es: "Versión de SCORM:"
  },
  "apiConnected": {
    en: "API Connected",
    pt: "API Conectada",
    es: "API Conectada"
  },
  "apiNotConnected": {
    en: "API Not Connected",
    pt: "API Não Conectada",
    es: "API No Conectada"
  },
  "completionStatus": {
    en: "Completion Status:",
    pt: "Status de Conclusão:",
    es: "Estado de Finalización:"
  },

  // StatusButtons.tsx
  "sendNewStatus": {
    en: "Send a New Status to the API:",
    pt: "Enviar um Novo Status para a API:",
    es: "Enviar un Nuevo Estado a la API:"
  },
  "aboutScormStatus": {
    en: "About SCORM Status: The lesson completion status is a fundamental element of SCORM that indicates student progress. It is sent to the LMS through the LMSSetValue(\"cmi.core.lesson_status\", status) function.",
    pt: "Sobre o Status SCORM: O status de conclusão da lição é um elemento fundamental do SCORM que indica o progresso do aluno. É enviado ao LMS através da função LMSSetValue(\"cmi.core.lesson_status\", status).",
    es: "Sobre el Estado SCORM: El estado de finalización de la lección es un elemento fundamental de SCORM que indica el progreso del estudiante. Se envía al LMS a través de la función LMSSetValue(\"cmi.core.lesson_status\", status)."
  },
  "howToUseStatus": {
    en: "How to use: Click on one of the buttons above to set the current lesson status. This simulates student progress and is used by the LMS to track course completion.",
    pt: "Como usar: Clique em um dos botões acima para definir o status atual da lição. Isso simula o progresso do aluno e é usado pelo LMS para rastrear a conclusão do curso.",
    es: "Cómo usar: Haga clic en uno de los botones de arriba para establecer el estado actual de la lección. Esto simula el progreso del estudiante y es utilizado por el LMS para realizar un seguimiento de la finalización del curso."
  },
  // Status options
  "passed": {
    en: "Passed",
    pt: "Aprovado",
    es: "Aprobado"
  },
  "completed": {
    en: "Completed",
    pt: "Concluído",
    es: "Completado"
  },
  "failed": {
    en: "Failed",
    pt: "Reprovado",
    es: "Reprobado"
  },
  "incomplete": {
    en: "Incomplete",
    pt: "Incompleto",
    es: "Incompleto"
  },
  "browsed": {
    en: "Browsed",
    pt: "Navegado",
    es: "Navegado"
  },
  "notAttempted": {
    en: "Not Attempted",
    pt: "Não Tentado",
    es: "No Intentado"
  },

  // Status descriptions
  "passedDesc": {
    en: "The student completed and passed the defined approval criteria",
    pt: "O aluno concluiu e passou nos critérios de aprovação definidos",
    es: "El estudiante completó y aprobó los criterios de aprobación definidos"
  },
  "completedDesc": {
    en: "The student completed the activity but without specific approval criteria",
    pt: "O aluno concluiu a atividade mas sem critérios de aprovação específicos",
    es: "El estudiante completó la actividad pero sin criterios de aprobación específicos"
  },
  "failedDesc": {
    en: "The student completed but did not pass the approval criteria",
    pt: "O aluno concluiu mas não passou nos critérios de aprovação",
    es: "El estudiante completó pero no aprobó los criterios de aprobación"
  },
  "incompleteDesc": {
    en: "The student started but has not yet completed the activity",
    pt: "O aluno iniciou mas ainda não concluiu a atividade",
    es: "El estudiante comenzó pero aún no ha completado la actividad"
  },
  "browsedDesc": {
    en: "The student only viewed the content without deeply interacting",
    pt: "O aluno apenas visualizou o conteúdo sem interagir profundamente",
    es: "El estudiante solo visualizó el contenido sin interactuar profundamente"
  },
  "notAttemptedDesc": {
    en: "The student has not yet started the activity",
    pt: "O aluno ainda não iniciou a atividade",
    es: "El estudiante aún no ha iniciado la actividad"
  },

  // SuspendDataForm.tsx & SuspendDataTable.tsx
  "scormSuspendData": {
    en: "SCORM Suspend Data",
    pt: "Dados de Suspensão SCORM",
    es: "Datos de Suspensión SCORM"
  },
  "suspendDataExplained": {
    en: "Suspend Data allows storing and retrieving student progress information, ensuring they can resume exactly where they left off.",
    pt: "Dados de Suspensão permitem armazenar e recuperar informações de progresso do aluno, garantindo que possam retomar exatamente de onde pararam.",
    es: "Los Datos de Suspensión permiten almacenar y recuperar información sobre el progreso del estudiante, asegurando que puedan reanudar exactamente donde lo dejaron."
  },
  "whatIsSuspendData": {
    en: "What is Suspend Data? It is a special field in SCORM used to store course state information between sessions. It is accessed through LMSGetValue(\"cmi.suspend_data\") and LMSSetValue(\"cmi.suspend_data\", data).",
    pt: "O que são Dados de Suspensão? É um campo especial no SCORM usado para armazenar informações do estado do curso entre sessões. É acessado através de LMSGetValue(\"cmi.suspend_data\") e LMSSetValue(\"cmi.suspend_data\", data).",
    es: "¿Qué son los Datos de Suspensión? Es un campo especial en SCORM utilizado para almacenar información del estado del curso entre sesiones. Se accede a través de LMSGetValue(\"cmi.suspend_data\") y LMSSetValue(\"cmi.suspend_data\", data)."
  },
  "suspendDataLimitation": {
    en: "Limitation: Suspend Data stores only strings, so for complex data, it is common to use JSON.stringify() to convert objects to strings before saving.",
    pt: "Limitação: Dados de Suspensão armazenam apenas strings, então para dados complexos, é comum usar JSON.stringify() para converter objetos em strings antes de salvar.",
    es: "Limitación: Los Datos de Suspensión almacenan solo cadenas de texto, así que para datos complejos, es común usar JSON.stringify() para convertir objetos en cadenas antes de guardar."
  },
  "key": {
    en: "Key",
    pt: "Chave",
    es: "Clave"
  },
  "keyHint": {
    en: "Identifier for the data (don't use spaces)",
    pt: "Identificador para o dado (não use espaços)",
    es: "Identificador para el dato (no use espacios)"
  },
  "value": {
    en: "Value",
    pt: "Valor",
    es: "Valor"
  },
  "valueHint": {
    en: "Value to be stored for this key",
    pt: "Valor a ser armazenado para esta chave",
    es: "Valor a almacenar para esta clave"
  },
  "saveData": {
    en: "Save Data",
    pt: "Salvar Dados",
    es: "Guardar Datos"
  },
  "examplesOfUse": {
    en: "Examples of use:",
    pt: "Exemplos de uso:",
    es: "Ejemplos de uso:"
  },
  "usage": {
    en: "Usage",
    pt: "Utilização",
    es: "Utilización"
  },
  "technicalNote": {
    en: "Technical note: Internally, the SCORM Provider organizes this data in a JSON object that is converted to a string before being stored in the LMS through LMSSetValue(\"cmi.suspend_data\", JSON.stringify(data)).",
    pt: "Nota técnica: Internamente, o SCORM Provider organiza estes dados em um objeto JSON que é convertido para string antes de ser armazenado no LMS através de LMSSetValue(\"cmi.suspend_data\", JSON.stringify(data)).",
    es: "Nota técnica: Internamente, el SCORM Provider organiza estos datos en un objeto JSON que se convierte en cadena antes de almacenarse en el LMS a través de LMSSetValue(\"cmi.suspend_data\", JSON.stringify(data))."
  },
  "suspendDataStored": {
    en: "Stored Data (Suspend Data):",
    pt: "Dados Armazenados (Dados de Suspensão):",
    es: "Datos Almacenados (Datos de Suspensión):"
  },
  "viewingSuspendData": {
    en: "Viewing Suspend Data: This table shows the data saved through the LMSGetValue(\"cmi.suspend_data\") function. This data persists between learning sessions and is essential for tracking student progress.",
    pt: "Visualizando Dados de Suspensão: Esta tabela mostra os dados salvos através da função LMSGetValue(\"cmi.suspend_data\"). Estes dados persistem entre sessões de aprendizado e são fundamentais para rastrear o progresso do aluno.",
    es: "Visualizando Datos de Suspensión: Esta tabla muestra los datos guardados a través de la función LMSGetValue(\"cmi.suspend_data\"). Estos datos persisten entre sesiones de aprendizaje y son fundamentales para rastrear el progreso del estudiante."
  },
  "lastPage": {
    en: "Last page visited",
    pt: "Última página visitada",
    es: "Última página visitada"
  },
  "savedAnswer": {
    en: "Saved answer",
    pt: "Resposta salva",
    es: "Respuesta guardada"
  },
  "progressPercentage": {
    en: "Progress percentage",
    pt: "Progresso percentual",
    es: "Porcentaje de progreso"
  },
  "userSettings": {
    en: "User settings",
    pt: "Configurações do usuário",
    es: "Configuraciones del usuario"
  },
  "howSuspendDataWorks": {
    en: "How it works: When the course is loaded, the SCORM Provider obtains this data via LMSGetValue(\"cmi.suspend_data\") and parses it to a JavaScript object for easy manipulation.",
    pt: "Como funciona: Quando o curso é carregado, o SCORM Provider obtém estes dados via LMSGetValue(\"cmi.suspend_data\") e os converte para um objeto JavaScript para fácil manipulação.",
    es: "Cómo funciona: Cuando se carga el curso, el SCORM Provider obtiene estos datos a través de LMSGetValue(\"cmi.suspend_data\") y los analiza para convertirlos en un objeto JavaScript para fácil manipulación."
  },
  "noSuspendData": {
    en: "No stored data at the moment",
    pt: "Nenhum dado armazenado no momento",
    es: "Sin datos almacenados por el momento"
  },
  "useSuspendDataForm": {
    en: "Use the form above to add data that will persist between sessions. This data is essential for maintaining the student's state and progress in the course.",
    pt: "Use o formulário acima para adicionar dados que persistirão entre sessões. Estes dados são essenciais para manter o estado e progresso do aluno no curso.",
    es: "Use el formulario de arriba para agregar datos que persistirán entre sesiones. Estos datos son esenciales para mantener el estado y progreso del estudiante en el curso."
  },
  "usageTips": {
    en: "Usage tips:",
    pt: "Dicas de uso:",
    es: "Consejos de uso:"
  },
  "suspendDataTip1": {
    en: "Use suspend_data to store information that needs to persist when the student closes and reopens the course",
    pt: "Use suspend_data para armazenar informações que precisam persistir quando o aluno fecha e reabre o curso",
    es: "Use suspend_data para almacenar información que necesita persistir cuando el estudiante cierra y reabre el curso"
  },
  "suspendDataTip2": {
    en: "The maximum size of suspend_data may vary between different LMS (typically from 4KB to 64KB)",
    pt: "O tamanho máximo do suspend_data pode variar entre diferentes LMS (normalmente de 4KB a 64KB)",
    es: "El tamaño máximo de suspend_data puede variar entre diferentes LMS (normalmente de 4KB a 64KB)"
  },
  "suspendDataTip3": {
    en: "For complex data, consider using stringified JSON or another compact serialization format",
    pt: "Para dados complexos, considere utilizar JSON stringificado ou outro formato de serialização compacto",
    es: "Para datos complejos, considere utilizar JSON stringificado u otro formato de serialización compacto"
  },
  "suspendDataTip4": {
    en: "Always call LMSCommit() after setting important data to ensure it is saved",
    pt: "Sempre chame LMSCommit() após definir dados importantes para garantir que sejam salvos",
    es: "Siempre llame a LMSCommit() después de establecer datos importantes para asegurar que se guarden"
  },

  // ScoreForm.tsx
  "sendScore": {
    en: "Send a Score to the API",
    pt: "Enviar uma Pontuação para a API",
    es: "Enviar una Puntuación a la API"
  },
  "aboutScormScore": {
    en: "About SCORM scoring: SCORM uses scoring to track student performance. This data is sent to the LMS through the LMSSetValue() function with the cmi.core.score model.",
    pt: "Sobre a pontuação SCORM: O SCORM utiliza a pontuação para rastrear o desempenho do aluno. Estes dados são enviados ao LMS através da função LMSSetValue() com o modelo cmi.core.score.",
    es: "Sobre la puntuación SCORM: SCORM utiliza la puntuación para rastrear el rendimiento del estudiante. Estos datos se envían al LMS a través de la función LMSSetValue() con el modelo cmi.core.score."
  },
  "scoreValue": {
    en: "Value",
    pt: "Valor",
    es: "Valor"
  },
  "scoreValueHint": {
    en: "The score obtained by the student (e.g., 85)",
    pt: "A pontuação obtida pelo aluno (ex: 85)",
    es: "La puntuación obtenida por el estudiante (ej: 85)"
  },
  "scoreMin": {
    en: "Min",
    pt: "Mínimo",
    es: "Mínimo"
  },
  "scoreMinHint": {
    en: "Minimum possible score (usually 0)",
    pt: "Pontuação mínima possível (geralmente 0)",
    es: "Puntuación mínima posible (generalmente 0)"
  },
  "scoreMax": {
    en: "Max",
    pt: "Máximo",
    es: "Máximo"
  },
  "scoreMaxHint": {
    en: "Maximum possible score (e.g., 100)",
    pt: "Pontuação máxima possível (ex: 100)",
    es: "Puntuación máxima posible (ej: 100)"
  },
  "scoreStatus": {
    en: "Status",
    pt: "Status",
    es: "Estado"
  },
  "scoreStatusHint": {
    en: "Activity completion status",
    pt: "Status de conclusão da atividade",
    es: "Estado de finalización de la actividad"
  },
  "submitScore": {
    en: "Submit Score",
    pt: "Enviar Pontuação",
    es: "Enviar Puntuación"
  },
  "scoreSubmitHint": {
    en: "When submitting, these values will be sent to the LMS through LMSSetValue(\"cmi.core.score.raw\"), LMSSetValue(\"cmi.core.score.min\"), LMSSetValue(\"cmi.core.score.max\") and LMSSetValue(\"cmi.core.lesson_status\")",
    pt: "Ao submeter, estes valores serão enviados ao LMS através de LMSSetValue(\"cmi.core.score.raw\"), LMSSetValue(\"cmi.core.score.min\"), LMSSetValue(\"cmi.core.score.max\") e LMSSetValue(\"cmi.core.lesson_status\")",
    es: "Al enviar, estos valores se enviarán al LMS a través de LMSSetValue(\"cmi.core.score.raw\"), LMSSetValue(\"cmi.core.score.min\"), LMSSetValue(\"cmi.core.score.max\") y LMSSetValue(\"cmi.core.lesson_status\")"
  }
};

// Função para obter uma tradução
export const getTranslation = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${ key }`);
    return key;
  }

  return translations[key][language] || translations[key]['en'];
};

// Hook para usar traduções
export const useTranslations = (language: Language) => {
  return {
    t: (key: string) => getTranslation(key, language)
  };
};

export default translations;
