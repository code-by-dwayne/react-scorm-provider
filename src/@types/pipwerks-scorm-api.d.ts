/**
 * @description Interface para a API SCORM do pipwerks-scorm-api-wrapper
 */
export interface PipwerksScormAPI {
	/**
	 * @description Objeto com métodos para manipular a API SCORM
	 */
	API: {
		/**
		 * @description Handle da API SCORM
		 */
		handle: Record<string, any>;

		/**
		 * @description Indica se a API foi encontrada
		 */
		isFound: boolean;

		/**
		 * @description Função para procurar a API SCORM
		 */
		find: () => boolean;

		/**
		 * @description Função para obter a API SCORM
		 */
		get: () => any;

		/**
		 * @description Função para obter o handle da API SCORM
		 */
		getHandle: () => any;
		/**
		 * @description Função para verificar se a API SCORM está disponível
		 */
		isAvailable: () => boolean;
		/**
		 * @description para commitar os dados
		 */
		LMSCommit: () => boolean;
	};

	/**
	 * @description Objeto com métodos para gerenciar a conexão com a API SCORM
	 */
	connection: {
		/**
		 * @description Indica se a conexão está ativa
		 */
		isActive: boolean;

		/**
		 * @description Função para inicializar a conexão
		 */
		initialize: () => boolean;

		/**
		 * @description Função para terminar a conexão
		 */
		terminate: () => boolean;
	};

	/**
	 * @description Objeto com métodos para manipular os dados do SCORM
	 */
	data: {
		/**
		 * @description Status de conclusão
		 */
		completionStatus: string;

		/**
		 * @description Status de saída
		 */
		exitStatus: string | null;

		/**
		 * @description Função para obter dados
		 */
		get: (parameter: string) => any;

		/**
		 * @description Função para definir dados
		 */
		set: (parameter: string, value: any) => boolean;

		/**
		 * @description Função para salvar dados
		 */
		save: () => boolean;
	};

	/**
	 * @description Objeto com métodos para depuração
	 */
	debug: {
		/**
		 * @description Função para obter o código de erro
		 */
		getCode: () => string;

		/**
		 * @description Função para obter informações de erro
		 */
		getInfo: (errorCode: string) => string;

		/**
		 * @description Função para obter informações de diagnóstico
		 */
		getDiagnosticInfo: (errorCode: string) => string;
	};

	/**
	 * @description Função para obter um valor da API SCORM
	 * @param parameter Parâmetro a ser obtido
	 */
	get: (parameter: string) => any;

	/**
	 * @description Define se deve lidar com o status de conclusão
	 */
	handleCompletionStatus: boolean;

	/**
	 * @description Define se deve lidar com o modo de saída
	 */
	handleExitMode: boolean;

	/**
	 * @description Função para inicializar a API SCORM
	 */
	init: () => boolean;

	/**
	 * @description Função para verificar se a API SCORM está disponível
	 */
	isAvailable: () => boolean;

	/**
	 * @description Função para encerrar a sessão
	 */
	quit: () => boolean;

	/**
	 * @description Função para salvar os dados
	 */
	save: () => boolean;

	/**
	 * @description Função para definir um valor na API SCORM
	 * @param parameter Parâmetro a ser definido
	 * @param value Valor a ser atribuído
	 */
	set: (parameter: string, value: any) => boolean;

	/**
	 * @description Função para manipular o status
	 * @param action Ação a ser realizada ('get' ou 'set')
	 * @param status Status a ser definido (quando action é 'set')
	 */
	status: (action: "get" | "set", status?: string) => string | boolean;

	/**
	 * @description Versão do SCORM
	 */
	version: string;
}
