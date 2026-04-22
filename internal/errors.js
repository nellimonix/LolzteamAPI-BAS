_LZTAPI.errors = {
	REQUEST_FAILED: {
		ru: '[REQUEST_FAILED] Не удалось выполнить запрос',
		en: '[REQUEST_FAILED] Failed to complete request'
	},
	REQUEST_TIMEOUT: {
		ru: '[REQUEST_TIMEOUT] Превышено время ожидания запроса',
		en: '[REQUEST_TIMEOUT] Request timeout exceeded'
	},
	MALFORMED_RESPONSE: {
		ru: '[MALFORMED_RESPONSE] От сервера получен неверный ответ',
		en: '[MALFORMED_RESPONSE] Malformed response received from server'
	},
	RATE_LIMIT_EXCEEDED: {
		ru: '[RATE_LIMIT_EXCEEDED] Слишком много запросов в секунду',
		en: '[RATE_LIMIT_EXCEEDED] Too many requests per second',
	},
	BAD_TOKEN: {
		ru: '[BAD_TOKEN] Ваш токен недействителен или у вас нет прав на выполнение этого действия',
		en: '[BAD_TOKEN] Your token is invalid or you do not have rights to perform this action',
		action: 'die',
		instantly: true
	},
	MISSING_SCOPE: {
		ru: 'MISSING_SCOPE',
		en: 'MISSING_SCOPE',
		action: 'die',
		instantly: true
	},
	BATCH_ERROR: {
		ru: '[BATCH_ERROR] Максимальное количество пакетных заданий - 10',
		en: '[BATCH_ERROR] Maximum batch jobs is 10',
		action: 'die',
		instantly: true
	},
	BAD_CONTEST_TYPE: {
		ru: '[BAD_CONTEST_TYPE] Неверно указан параметр: contest_type',
		en: '[BAD_CONTEST_TYPE] Incorrect parameter: contest_type',
		action: 'die',
		instantly: true
	},
	BAD_PRIZE_TYPE: {
		ru: '[BAD_PRIZE_TYPE] Неверно указан параметр: prize_type',
		en: '[BAD_PRIZE_TYPE] Incorrect parameter: prize_type',
		action: 'die',
		instantly: true
	},
	SYSTEM_ERROR: {
		ru: '[SYSTEM_ERROR] Неизвестная, серверная ошибка',
		en: '[SYSTEM_ERROR] Unknown, server error',
		action: 'fail',
		stop: false
	},
	'bad request': {
		ru: '[bad request] Отправлен неверный запрос',
		en: '[bad request] Invalid request sent',
		action: 'die',
		instantly: false
	},
	unknown: {
		ru: '[unknown] Неизвестная ошибка',
		en: '[unknown] Unknown error',
		action: 'fail',
		stop: false
	}
}
