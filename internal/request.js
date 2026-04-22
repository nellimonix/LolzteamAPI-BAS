_LZTAPI.request = {
	make: function () {
		var ctxt = _arguments()

		var params = ctxt.params || {}
		var path = ctxt.path || ''
		var baseUrl = _LZTAPI.baseUrl
		var scopes = ctxt.scopes || []

		var url = baseUrl + path
		if (Object.keys(params).length) {
			url += '?' + _LZTAPI.request.serialize(params)
		}

		var timeout = Number(ctxt.timeout) || 10000
		var maxTime = (Number(ctxt.maxTime) || 60000) + Date.now()
		var interval = Number(ctxt.interval) || 2000

		var method = ctxt.method || 'GET'
		var dataJ = ctxt.dataJ ? JSON.stringify(ctxt.dataJ) : null
		var files = ctxt.files || null

		if (_LZTAPI._batch_record) {
			var index_jobs = _LZTAPI._jobs.length + 1
			if (index_jobs > 10) {
				_LZTAPI.tools.errorsHandler('BATCH_ERROR')
				return
			}
			_LZTAPI._jobs.push({
				id: 'jobs_' + index_jobs.toString(),
				uri: url,
				method: method,
				params: files ? files : dataJ ? dataJ : null
			})
			_LZTAPI.tools.log(
				'☗ Добавлен в пакетный запрос: ' + url,
				'☗ Added to batch request: ' + url
			)
			return
		}

		if (!_LZTAPI.token) {
			_LZTAPI.tools.errorsHandler('BAD_TOKEN')
			return
		}

		_LZTAPI.tools._CheckScopes(scopes)

		var response = null

		_do(function () {
			var timeLeft = maxTime - Date.now()
			if (timeLeft - interval < 0) _break()

			_if(_iterator() % 2 === 0, function () {
				_call_function(_LZTAPI.tools.sleep, { time: interval })!
				_next('function')
			})!

			_LZTAPI.tools.log(
				'● Осталось времени: ' + timeLeft,
				'● Time left: ' + timeLeft
			)

			_call_function(_LZTAPI.request.send, {
				url: url,
				timeout: timeout,
				maxTime: timeLeft,
				interval: interval,
				method: method,
				dataJ: dataJ,
				files: files
			})!

			var candidate = _result_function()

			if (!candidate || !_LZTAPI.tools.typeValid(candidate, 'object')) {
				_next('function')
			}

			var resValid =
				candidate.status === 'ok'


			if ((resValid || candidate.status === undefined) && !candidate.errors) {
				response = candidate
				_break()
			}

			var errorCode =
				candidate.errors ? candidate.errors[0] : 'MALFORMED_RESPONSE'

			if (errorCode === 'MALFORMED_RESPONSE') {
				_LZTAPI.tools.errorsHandler(errorCode)
			} else {
				_LZTAPI.tools.errorsHandler(errorCode, errorCode)
			}

		})!

		_function_return(response)
	},
	send: function () {
		var ctxt = _arguments()

		var url = _LZTAPI.tools.reduceString(ctxt.url)

		_call_function(_LZTAPI.tools._auto_delay, { delay: 3000 })!

		var timeout = Number(ctxt.timeout) || 10000
		var maxTime = (Number(ctxt.maxTime) || 60000) + Date.now()
		var interval = Number(ctxt.interval) || 2000

		var headers =
			'User-Agent: LOLZTEAM API BAS by llimonix\r\nAccept: application/json\r\n' +
			'Accept-Encoding: gzip, deflate\r\nConnection: keep-alive'
		if (_LZTAPI.token) {
			headers += '\r\nAuthorization: Bearer ' + _LZTAPI.token
		}

		var method = ctxt.method
		var dataJ = ctxt.dataJ
		var files = ctxt.files

		var response = null
		var responseTime = null

		_switch_http_client_internal()
		http_client_set_fail_on_error(false)

		if (_LZTAPI.use_proxy) {
			var proxy = proxy_parse(_LZTAPI.proxy);
			if (_LZTAPI.proxy_type !== "auto") {
				proxy["IsHttp"] = _LZTAPI.proxy_type === "http";
			}

			http_client_set_proxy(proxy["server"], proxy["Port"], proxy["IsHttp"], proxy["name"], proxy["password"])
		}

		_do(function () {
			var timeLeft = maxTime - Date.now()
			if (timeLeft - interval < 0) _break()

			_if(_iterator() > 1, function () {
				_call_function(_LZTAPI.tools.sleep, { time: interval })!
			})!

			_call(function () {
				_on_fail(function () {
					VAR_LAST_ERROR = _result()
					VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
					VAR_WAS_ERROR = false
					_break(1, true)
				})

				CYCLES.Current().RemoveLabel('function')

				var requestTimeout =
					timeLeft < timeout
						? timeLeft
						: timeout < 60000
							? timeout
							: 60000

				_LZTAPI.tools.log('↑ Запрос: ' + url, '↑ Request: ' + url)
				_LZTAPI.tools.log(
					'● Время ожидания ответа: ' + requestTimeout,
					'● Response timeout: ' + requestTimeout
				)

				responseTime = Date.now()
				general_timeout_next(requestTimeout)
				if (method === 'GET' || method === 'DELETE') {
					http_client_get2(url, {
						method: method,
						headers: headers
					})!
				} else if (method === 'POST' || method === 'PUT') {
					if (files) {
						http_client_post(url, files, {
							'content-type': 'multipart',
							encoding: 'UTF-8',
							method: method,
							headers: headers
						})!
					} else {
						http_client_post(url, dataJ ? ['data', dataJ] : null, {
							'content-type': 'application/json',
							encoding: 'UTF-8',
							method: method,
							headers: headers
						})!
					}
				}

				_LZTAPI._auto_delay_time = Date.now() + 500
			}, null)!

			if (http_client_was_error() || VAR_WAS_ERROR) {
				_LZTAPI.tools.errorsHandler(
					VAR_WAS_ERROR ? 'REQUEST_TIMEOUT' : 'REQUEST_FAILED'
				)
			} else {
				responseTime = Date.now() - responseTime
				var statusCode = http_client_status()
				var contentType = http_client_header('Content-Type')
				var body = http_client_content('utf-8')

				_LZTAPI.tools.log(
					[
						'↓ Время ответа: ' + responseTime,
						'Cтатус: ' + statusCode,
						'Тип содержимого: ' + contentType
					],
					[
						'↓ Response time: ' + responseTime,
						'Status: ' + statusCode,
						'Content-type: ' + contentType
					]
				)
				_LZTAPI.tools.log('↓ Ответ: ' + body, '↓ Response: ' + body)

				var resValid =
					statusCode === 200 &&
					contentType.indexOf('application/json') === 0 &&
					body

				var candidate = resValid ? _LZTAPI.tools.JSONload(body) : null

				if (candidate) {
					response = candidate
					_break()
				}

				if (statusCode === 403) {
					_LZTAPI.tools.errorsHandler('BAD_TOKEN')
				} else if (statusCode === 429) {
					_LZTAPI.tools.errorsHandler('RATE_LIMIT_EXCEEDED')
				} else if (statusCode <= 500) {
					_LZTAPI.tools.errorsHandler('SYSTEM_ERROR')
				} else if (statusCode <= 400) {
					_LZTAPI.tools.errorsHandler('bad request')
				} else {
					_LZTAPI.tools.errorsHandler('MALFORMED_RESPONSE')
				}
			}
		})!

		http_client_set_proxy()
		http_client_set_fail_on_error(true)
		_switch_http_client_main()

		_function_return(response)
	},
	serialize: function (object) {
		var _ctxt = []
		for (var prop in object)
			if (object.hasOwnProperty(prop)) {
				var value = object[prop];
				if (Array.isArray(value)) {
					// Если значение — массив, добавляем каждый элемент с тем же ключом
					value.forEach(function (item) {
						_ctxt.push(
							encodeURIComponent(prop) +
							'=' +
							encodeURIComponent(item).replace(/%20/g, '+') // Изменяем пробелы
						);
					});
				} else {
					// Если значение — не массив, добавляем его как обычно
					_ctxt.push(
						encodeURIComponent(prop) +
						'=' +
						encodeURIComponent(value).replace(/%20/g, '+') // Изменяем пробелы
					);
				}
			}
		return _ctxt.join('&')
	}
}
