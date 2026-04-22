_LZTAPI.tools = {
	cleanObject: function (object, props) {
		if (!object || !Object.keys(object).length) return {}
		props = props || Object.keys(object)
		var _ctxt = {}
		Object.keys(object).forEach(function (prop) {
			if (
				object.hasOwnProperty(prop) &&
				object[prop] &&
				~props.indexOf(prop)
			) {
				_ctxt[prop] = object[prop]
			}
		})
		return _ctxt
	},
	typeValid: function (el, type) {
		switch (type) {
			case 'string':
				return Object.prototype.toString.call(el) === '[object String]'
			case 'array':
				return Object.prototype.toString.call(el) === '[object Array]'
			case 'number':
				return typeof el === 'number'
			case 'object':
				return Object.prototype.toString.call(el) === '[object Object]'
			default:
				return false
		}
	},
	JSONload: function (string) {
		_ctxt = null
		try {
			_ctxt = JSON.parse(string)
		} catch (e) {}
		return _ctxt
	},
	reduceString: function (string) {
		return string ? string.toString().trim() : ''
	},
	errorsHandler: function (code, text) {
		code = _LZTAPI.tools.reduceString(code)

		var errorObj = _LZTAPI.errors.hasOwnProperty(code)
			? _LZTAPI.errors[code]
			: _LZTAPI.errors['unknown']

		var msg = errorObj[_K] || errorObj['ru']
		msg = msg + (text ? ' | ' + text : '')

		_LZTAPI.tools.log('●' + ' ' + msg)

		msg = 'LOLZTEAM API by llimonix: ' + msg

		if (errorObj.action === 'fail') {
			http_client_set_fail_on_error(true)
			_switch_http_client_main()
			fail(msg, Boolean(errorObj.stop))
		}
		if (errorObj.action === 'die') {
			die(msg, Boolean(errorObj.instantly))
		}

		return
	},
	setErrors: function (ctxt) {
		if (!ctxt.err) return
		;(_LZTAPI.tools.typeValid(ctxt.err, 'array')
			? ctxt.err
			: ctxt.err.split(',')
		).forEach(function (el) {
			_LZTAPI.errors[el] = _LZTAPI.errors[el] || {}
			_LZTAPI.errors[el].action = ctxt.errType
			_LZTAPI.errors[el].stop = Boolean(ctxt.stop)
			_LZTAPI.errors[el].instantly = Boolean(ctxt.instantly)
		})
	},
	log: function (ruText, enText) {
		if (_LZTAPI.debug) {
			enText = enText || ruText
			var msg = _K === 'ru' ? ruText : enText
			msg = _LZTAPI.tools.typeValid(msg, 'array') ? msg.join(' | ') : msg
			_info('[LOLZTEAM API by llimonix | DEBUG] ' + msg)
		}
	},
	warn: function (ruText, enText) {
		enText = enText || ruText
		var msg = _K === 'ru' ? ruText : enText
		msg = _LZTAPI.tools.typeValid(msg, 'array') ? msg.join(' | ') : msg
		log('[LOLZTEAM API by llimonix | WARNING] ' + msg)
	},
	sleep: function () {
		var sleepTime = Object(_arguments())['time'] || 1000
		_LZTAPI.tools.log('● Пауза ' + sleepTime, '● Pause ' + sleepTime)
		sleep(sleepTime)!
	},
	setup_jwt: function (token) {
		try {
			if (token.indexOf(".") !== -1) {
				var payloadBase64 = token.split(".")[1];
				var decodedPayload = JSON.parse(base64_decode(payloadBase64));
				_LZTAPI._user_id = decodedPayload.sub || "me";
				_LZTAPI._scopes = (decodedPayload.scope || "basic read post conversate market").split(" ");
			} else {
				_LZTAPI.tools.errorsHandler('BAD_TOKEN')
			}
		} catch (error) {
			_LZTAPI.tools.errorsHandler('BAD_TOKEN')
		}
		_LZTAPI.tools.log(
			'Установка jwt токена | User ID: ' + _LZTAPI._user_id + ' | Scopes: ' + _LZTAPI._scopes,
			'Setup jwt token | User ID: ' + _LZTAPI._user_id + ' | Scopes: ' + _LZTAPI._scopes
		)
	},
	_auto_delay: function () {
		var delay = Object(_arguments())['delay'] || 3000
		if (_LZTAPI.bypass_429) {
			var time_diff = Date.now() - _LZTAPI._auto_delay_time
			if (time_diff < delay) {
				var sleepTime = delay - time_diff
				_LZTAPI.tools.log('● [BYPASS_429] Пауза ' + sleepTime, '● [BYPASS_429] Pause ' + sleepTime)
				sleep(sleepTime)!
			}
		}
	},
	jsonToBase64Array: function (object, props) {
		if (!object || !Object.keys(object).length) return {}
		props = props || Object.keys(object)
		var _result = []
		Object.keys(object).forEach(function (prop) {
			if (
				object.hasOwnProperty(prop) &&
				object[prop] &&
				~props.indexOf(prop)
			) {
				_result.push(prop);
				_result.push("base64://" + object[prop]);
			}
		})
		return _result
	},
	_CheckScopes: function (scopes) {
		var permissionsArray = _LZTAPI._scopes
		var missingPermissions = []
		scopes.every(function(permission) {
			if (permissionsArray.indexOf(permission) === -1) {
				missingPermissions.push(permission)
			}
			return permissionsArray.indexOf(permission) !== -1
		});

		if (missingPermissions.length > 0) {
			_LZTAPI.tools.errorsHandler(
				'MISSING_SCOPE',
				'[' + missingPermissions.join(', ') + '] scope is required to use but not ' +
				'provided in your token. You should recreate token with [' + missingPermissions.join(', ') + '] scope.'
			)
		}
	}
}
