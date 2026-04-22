_LZTAPI = {
	baseUrl: 'https://api.zelenka.guru',
	token: '',
	debug: false,
	bypass_429: true,
	use_proxy: false,
	proxy: '',
	proxy_type: 'http',
	_user_id: '',
	_scopes: '',
	_auto_delay_time: 0,
	_batch_record: false,
	_jobs: [],

	setDefaultSetting: function (ctxt) {
		if (!ctxt || !Object.keys(ctxt).length) return

		_LZTAPI.baseUrl = 'https://' + ctxt.baseUrl

		_LZTAPI.debug = Boolean(ctxt.debug)
		_LZTAPI.bypass_429 = Boolean(ctxt.bypass_429)

		_LZTAPI.token = ctxt.token
		_LZTAPI.tools.setup_jwt(ctxt.token)

		_LZTAPI.use_proxy = Boolean(ctxt.use_proxy)
		_LZTAPI.proxy = ctxt.proxy
		_LZTAPI.proxy_type = ctxt.proxy_type

		if (ctxt.failErrors) {
			_LZTAPI.tools.setErrors({
				err: ctxt.failErrors,
				errType: 'fail',
				stop: Boolean(ctxt.failStop)
			})
		}
		if (ctxt.dieErrors) {
			_LZTAPI.tools.setErrors({
				err: ctxt.dieErrors,
				errType: 'die',
				instantly: Boolean(ctxt.dieInstantly)
			})
		}
		if (ctxt.ignoreErrors) _LZTAPI.tools.setErrors({ err: ctxt.ignoreErrors })

		return
	},
	__Categories: {
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'parent_category_id',
				'parent_forum_id',
				'order'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/categories'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/categories/' + ctxt.categoryId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Forums: {
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'parent_category_id',
				'parent_forum_id',
				'order'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/' + ctxt.forumId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		follow: function () {
			var ctxt = _arguments()

			// Этот список был создан там, где API принимает 0 или 1. А у нас true или false
			// Сюда так же была добавлена строка, в которой мы указываем список через запятую
			var list_ctxt = [
				"post",
				"alert",
				"email",
				"prefix_ids"
			]

			list_ctxt.forEach(function (key) {
				if (ctxt[key]) {
					if (key === 'prefix_ids') {
						var parts = ctxt.prefix_ids.split(',')
						ctxt['prefix_ids'] = []
						for (var i = 0; i < parts.length; i++) {
							ctxt['prefix_ids'][i] = parseInt(parts[i], 10)
						}
					} else {
						ctxt[key] = 1
					}
				}
			})

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, [
				'post',
				'alert',
				'email',
				'prefix_ids',
				'minimal_contest_amount'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/' + ctxt.forumId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unfollow: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/' + ctxt.forumId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		followers: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/' + ctxt.forumId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		followed: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'total',
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/followed'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		grouped: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/grouped'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		getFeedOptions: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/feed/options'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		editFeedOptions: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forums/feed/options'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['node_ids', 'keywords'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	__LinkForums: {
		list: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/link-forums'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/link-forums/' + ctxt.linkId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Pages: {
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'parent_page_id',
				'order'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/pages'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/pages/' + ctxt.pageId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Threads: {
		__Contests: {
			create: function () {
				var ctxt = _arguments()

				// Этот список был создан там, где API принимает 0 или 1. А у нас true или false
				// Сюда так же была добавлена строка, в которой мы указываем список через запятую
				var list_ctxt = [
					'watch_thread_state',
					'watch_thread',
					'watch_thread_email',
					'prize_data_places',
					'is_money_places'
				]

				list_ctxt.forEach(function (key) {
					if (ctxt[key]) {
						if (key === 'prize_data_places') {
							ctxt['prize_data_places[]'] = ctxt.prize_data_places.split(',')
						} else {
							ctxt[key] = 1
						}
					}
				})

				var props = [
					'contest_type',
					'prize_type',
					'length_value',
					'length_option',
					'is_money_places',
					'require_like_count',
					'require_total_like_count',
					'secret_answer',
					'title',
					'title_en',
					'tags',
					'hide_contacts',
					'allow_ask_hidden_content',
					'reply_group',
					'comment_ignore_group',
					'dont_alert_followers',
					'watch_thread_state',
					'watch_thread',
					'watch_thread_email'
				]

				ctxt['contest_type'] = 'by_finish_date'

				if (ctxt.prize_type === 'money') {
					if (ctxt.is_money_places) {
						props = props.concat([
							'prize_data_places[]'
						])
					} else {
						props = props.concat([
							'count_winners',
							'prize_data_money',

						])
					}
				} else if (ctxt.prize_type === 'upgrades') {
					props = props.concat(['prize_data_upgrade'])
				} else {
					_LZTAPI.tools.errorsHandler('BAD_PRIZE_TYPE')
				}

				var params = _LZTAPI.tools.cleanObject(ctxt, props)

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/contests'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			}
		},
		__Arbitrage: {
			create: function () {
				var ctxt = _arguments()

				// Этот список был создан там, где API принимает 0 или 1. А у нас true или false
				// Сюда так же была добавлена строка, в которой мы указываем список через запятую
				var list_ctxt = [
					'watch_thread_state',
					'watch_thread',
					'watch_thread_email'
				]

				list_ctxt.forEach(function (key) {
					if (ctxt[key]) {
						ctxt[key] = 1
					}
				})

				var props = [
					'as_responder',
					'as_amount',
					'currency',
					'as_tg_login_screenshot',
					'tags',
					'hide_contacts',
					'allow_ask_hidden_content',
					'reply_group',
					'comment_ignore_group',
					'dont_alert_followers',
					'watch_thread_state',
					'watch_thread',
					'watch_thread_email'
				]

				if (ctxt.as_is_market_deal) {
					props = props.concat([
						'as_market_item_id'
					])
				} else {
					props = props.concat([
						'as_data',
						'transfer_type',
						'as_funds_receipt'
					])
				}

				var params = _LZTAPI.tools.cleanObject(ctxt, props)

				params['as_is_market_deal'] = ctxt.as_is_market_deal

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/claims'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			}
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'forum_id',
				'creator_user_id',
				'thread_prefix_id',
				'thread_tag_id',
				'page',
				'limit',
				'order'
			])

			if (ctxt.sticky1) {
				params['sticky'] = '1'
			} else if (ctxt.sticky0) {
				params['sticky'] = '0'
			}

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		create: function () {
			var ctxt = _arguments()

			// Этот список был создан там, где API принимает 0 или 1. А у нас true или false
			// Сюда так же была добавлена строка, в которой мы указываем список через запятую
			var list_ctxt = [
				"watch_thread_state",
				"watch_thread",
				"watch_thread_email",
				"prefix_id"
			]

			list_ctxt.forEach(function (key) {
				if (ctxt[key]) {
					if (key === 'prefix_id') {
						ctxt['prefix_id[]'] = ctxt.prefix_id.split(',')
					} else {
						ctxt[key] = 1
					}
				}
			})

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'forum_id',
				'title',
				'title_en',
				'prefix_id[]',
				'tags',
				'hide_contacts',
				'allow_ask_hidden_content',
				'reply_group',
				'comment_ignore_group',
				'dont_alert_followers',
				'watch_thread_state',
				'watch_thread',
				'watch_thread_email'
			])

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		edit: function () {
			var ctxt = _arguments()

			if (ctxt.prefix_id) {
				ctxt['prefix_id[]'] = ctxt.prefix_id.split(',')
			}

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'title',
				'title_en',
				'prefix_id[]',
				'tags',
				'hide_contacts',
				'allow_ask_hidden_content',
				'reply_group',
				'comment_ignore_group'
			])

			params['discussion_open'] = ctxt.discussion_open

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		delete_: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'reason'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		bump: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/bump'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		move: function () {
			var ctxt = _arguments()

			// Этот список был создан там, где API принимает 0 или 1. А у нас true или false
			// Сюда так же была добавлена строка, в которой мы указываем список через запятую
			var list_ctxt = [
				"apply_thread_prefix",
				"prefix_id"
			]

			list_ctxt.forEach(function (key) {
				if (ctxt[key]) {
					if (key === 'prefix_id') {
						ctxt['prefix_id[]'] = ctxt.prefix_id.split(',')
					} else {
						ctxt[key] = 1
					}
				}
			})

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'node_id',
				'title',
				'title_en',
				'prefix_id[]',
				'apply_thread_prefix'
			])

			params['send_alert'] = ctxt.send_alert

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/move'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		follow: function () {
			var ctxt = _arguments()

			ctxt.email = ctxt.email ? 1 : ctxt.email;

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'forumId'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unfollow: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		followers: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.forumId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		followed: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'total'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/followed'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		votes: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/poll'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		vote: function () {
			var ctxt = _arguments()

			ctxt["response_ids[]"] = ctxt.response_ids ? ctxt.response_ids.split(",") : ctxt.response_ids

			var params

			if (ctxt["response_ids[]"]) {
				if (ctxt["response_ids[]"].length === 1) {
					ctxt["response_id"] = ctxt["response_ids[]"][0];
					params = _LZTAPI.tools.cleanObject(ctxt, ['response_id'])
				} else {
					params = _LZTAPI.tools.cleanObject(ctxt, ['response_ids[]'])
				}
			} else {
				params = _LZTAPI.tools.cleanObject(ctxt, ['response_id'])
			}

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/poll/votes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		new_: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'limit',
				'forum_id',
				'data_limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/new'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		recent: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'limit',
				'forum_id',
				'data_limit',
				'days'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/recent'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		star: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/star'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unstar: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/star'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		hide: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/hide'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		finishContest: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/contests/' + ctxt.threadId + '/finish'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		navigation: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/threads/' + ctxt.threadId + '/navigation'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Posts: {
		__Posts_comments: {
			get: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'before',
					'before_comment'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/' + ctxt.postId + '/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['read']
				})!

				_function_return(_result_function())
			},
			create: function () {
				var ctxt = _arguments()

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['comment_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/' + ctxt.postId + '/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			edit: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/comments'

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_comment_id', 'comment_body'])

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'PUT',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			detele_: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			reportReasons: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/comments/report'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			report: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/posts/comments/report'

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_comment_id', 'message'])

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'thread_id',
				'page_of_post_id',
				'page',
				'limit',
				'order'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		create: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'thread_id',
				'quote_post_id'
			])

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		edit: function () {
			var ctxt = _arguments()

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		delete_: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'reason'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		likes: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		like: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unlike: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		reportReasons: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId + '/report'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		report: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'message'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/posts/' + ctxt.postId + '/report'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	__Profile_posts: {
		__Profile_posts_comments: {
			list: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'before',
					'limit'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/' + ctxt.profilePostId + '/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['read']
				})!

				_function_return(_result_function())
			},
			get: function () {
				var ctxt = _arguments()

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/' + ctxt.profilePostId + '/comments/' + ctxt.commentId

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['read']
				})!

				_function_return(_result_function())
			},
			create: function () {
				var ctxt = _arguments()

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['comment_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/' + ctxt.profilePostId + '/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			edit: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/comments'

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['comment_id', 'comment_body'])

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'PUT',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			detele_: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/comments'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			report: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/profile-posts/comments/' + ctxt.commentId + '/report'

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['message'])

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/profile-posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		create: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'user_id'
			])

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		edit: function () {
			var ctxt = _arguments()

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['post_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		delete_: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'reason'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		likes: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		like: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unlike: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		reportReasons: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/report'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		report: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'message'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/report'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		stick: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/stick'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unstick: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/profile-posts/' + ctxt.profilePostId + '/stick'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	__Users: {
		__Avatar: {
			upload: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'x',
					'y',
					'crop'
				])

				var files = _LZTAPI.tools.jsonToBase64Array(ctxt, [
					'avatar'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/avatar'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					files: files,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			delete_: function () {
				var ctxt = _arguments()

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/avatar'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			crop: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'x',
					'y',
					'crop'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/avatar/crop'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					scopes: ['post']
				})!

				_function_return(_result_function())
			}
		},
		__Background: {
			upload: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'x',
					'y',
					'crop'
				])

				var files = _LZTAPI.tools.jsonToBase64Array(ctxt, [
					'background'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/background'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					files: files,
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			delete_: function () {
				var ctxt = _arguments()

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/background'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post']
				})!

				_function_return(_result_function())
			},
			crop: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'x',
					'y',
					'crop'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/users/' + ctxt.userId + '/background/crop'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					scopes: ['post']
				})!

				_function_return(_result_function())
			}
		},
		secretAnswerTypes: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/secret-answer/types'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		resetSecretAnswer: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/account/secret-answer/reset'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		cancelSAReset: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/account/secret-answer/reset'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		getCurrent: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/me'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		fields: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/fields'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		claims: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, ['type', 'claim_state'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/claims'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		search: function () {
			var ctxt = _arguments()

			// Твик для кастомных полей для поиска
			var list_ctxt = [
				"custom_fields",
				"location",
				"occupation",
				"homepage",
				"interests",
				"lztInnovationLink",
				"lztInnovation20Link",
				"lztInnovation30Link",
				"scamURL",
				"maecenasValue",
				"telegram",
				"vk",
				"steam",
				"jabber",
				"lztDeposit",
				"ban_reason"
			]

			var props = [
				'username',
				'user_email'
			]

			list_ctxt.forEach(function (key) {
				if (ctxt[key]) {
					if (key === 'custom_fields') {
						var custom_fields_list = ctxt[key].split(',');
						for (var i = 0; i < custom_fields_list.length; i++) {
							var custom_pair = custom_fields_list[i].split('=')
							ctxt['custom_fields[' + custom_pair[0] + ']'] = custom_pair[1]
							props = props.concat([
								'custom_fields[' + custom_pair[0] + ']'
							])
						}
					} else if (key === 'interests') {
						ctxt['custom_fields[_4]'] = ctxt[key]
						props = props.concat([
							'custom_fields[_4]'
						])
					} else {
						ctxt['custom_fields[' + key + ']'] = ctxt[key]
						props = props.concat([
							'custom_fields[' + key + ']'
						])
					}
				}
			})

			var params = _LZTAPI.tools.cleanObject(ctxt, props)

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/find'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		edit: function () {
			var ctxt = _arguments()

			// Твик для кастомных полей для поиска
			var list_ctxt = [
				"location",
				"occupation",
				"homepage",
				"interests",
				"lztInnovationLink",
				"lztInnovation20Link",
				"lztInnovation30Link",
				"telegram",
				"vk",
				"steam",
				"jabber",
				"discord",
				"secondary_group_ids"
			]

			var props = [
				'user_title',
				'primary_group_id',
				'secondary_group_ids[]',
				'display_group_id',
				'user_dob_day',
				'user_dob_month',
				'user_dob_year'
			]

			list_ctxt.forEach(function (key) {
				if (ctxt[key]) {
					if (key === 'interests') {
						ctxt['fields[_4]'] = ctxt[key]
						props = props.concat([
							'fields[_4]'
						])
					} else if (key === 'secondary_group_ids') {
						ctxt['secondary_group_ids[]'] = ctxt.secondary_group_ids.split(',')
					} else {
						ctxt['fields[' + key + ']'] = ctxt[key]
						props = props.concat([
							'fields[' + key + ']'
						])
					}
				}
			})

			var params = _LZTAPI.tools.cleanObject(ctxt, props)

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		follow: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unfollow: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		followers: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'order',
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/followers'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		followings: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'order',
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/followings'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		ignored: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'total'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/ignored'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		ignore: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		unignore: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		ignoreEdit: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, ['ignore_conversations', 'ignore_content', 'restrict_view_profile'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		timeline: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/timeline'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		trophies: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/trophies'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		likes: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, ['node_id', 'like_type', 'type', 'page', 'content_type', 'search_user_id', 'stats'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/users/' + ctxt.userId + '/likes'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Conversations: {
		__Conversations_messages: {
			list: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'conversation_id',
					'order',
					'before',
					'after',
					'page',
					'limit'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversation-messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['read', 'conversate']
				})!

				_function_return(_result_function())
			},
			get: function () {
				var ctxt = _arguments()

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversation-messages/' + ctxt.messageId

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['read', 'conversate']
				})!

				_function_return(_result_function())
			},
			create: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'conversation_id'
				])

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['message_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversation-messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['read', 'conversate']
				})!

				_function_return(_result_function())
			},
			edit: function () {
				var ctxt = _arguments()

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['message_body'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversation-messages/' + ctxt.messageId

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'PUT',
					dataJ: dataJ,
					scopes: ['read', 'conversate']
				})!

				_function_return(_result_function())
			},
			delete_: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversations/' + ctxt.conversationId + '/messages/' + ctxt.messageId

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['conversate']
				})!

				_function_return(_result_function())
			},
			stick: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversations/' + ctxt.conversationId + '/messages/' + ctxt.messageId + '/stick'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					scopes: ['post', 'conversate']
				})!

				_function_return(_result_function())
			},
			unstick: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversations/' + ctxt.conversationId + '/messages/' + ctxt.messageId + '/stick'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post', 'conversate']
				})!

				_function_return(_result_function())
			},
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read', 'conversate']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read', 'conversate']
			})!

			_function_return(_result_function())
		},
		create: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'recipient_id',
				'recipients',
				'is_group',
				'title',
				'open_invite',
				'conversation_locked',
				'allow_edit_messages'
			])

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['message_body'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['read', 'conversate']
			})!

			_function_return(_result_function())
		},
		start: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/start'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['user_id'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		edit: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['conversation_id', 'title', 'open_invite', 'history_open', 'allow_edit_messages', 'allow_sticky_messages', 'allow_delete_own_messages'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'PUT',
				dataJ: dataJ,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		invite: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId + '/invite'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['recipients'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		kick: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId + '/kick'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['user_id'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		delete_: function () {
			var ctxt = _arguments()


			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'delete_type', 'conversation_id'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post', 'conversate']
			})!

			_function_return(_result_function())
		},
		read: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId + '/read'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		readAll: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/read-all'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['read', 'conversate']
			})!

			_function_return(_result_function())
		},
		star: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId + '/star'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post', 'conversate']
			})!

			_function_return(_result_function())
		},
		unstar: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/' + ctxt.conversationId + '/star'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['post', 'conversate']
			})!

			_function_return(_result_function())
		},
		alerts: {
			enable: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversations/' + ctxt.conversationId + '/alerts'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: null,
					scopes: ['post', 'conversate']
				})!

				_function_return(_result_function())
			},
			disable: function () {
				var ctxt = _arguments()


				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/conversations/' + ctxt.conversationId + '/alerts'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: null,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['post', 'conversate']
				})!

				_function_return(_result_function())
			},
		},
		save: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/save'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['link'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['conversate']
			})!

			_function_return(_result_function())
		},
		search: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/conversations/search'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['q', 'conversation_id', 'search_recipients'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['read', 'conversate']
			})!

			_function_return(_result_function())
		}
	},
	__Chatbox: {
		__Chatbox_messages: {
			get: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'room_id',
					'before_message_id'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			create: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'room_id'
				])

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['reason'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			edit: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'message_id'
				])

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['reason'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'PUT',
					dataJ: dataJ,
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			delete_: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'message_id'
				])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'DELETE',
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			online: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, ['room_id'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages/online'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			leaderboard: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, ['duration'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages/leaderboard'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			reportReasons: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, ['message_id'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages/report'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'GET',
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			},
			report: function () {
				var ctxt = _arguments()

				var params = _LZTAPI.tools.cleanObject(ctxt, [
					'message_id'
				])

				var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['reason'])

				var timeout = Number(ctxt.timeout) || 5000
				var interval = Number(ctxt.interval) || 3000
				var maxTime = Number(ctxt.maxTime) || 60000

				var path = '/chatbox/messages/report'

				_call_function(_LZTAPI.request.make, {
					path: path,
					params: params,
					timeout: timeout,
					interval: interval,
					maxTime: maxTime,
					method: 'POST',
					dataJ: dataJ,
					scopes: ['chatbox']
				})!

				_function_return(_result_function())
			}
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'room_id'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/chatbox'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['chatbox']
			})!

			_function_return(_result_function())
		},
		ignored: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/chatbox/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['chatbox']
			})!

			_function_return(_result_function())
		},
		ignore: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'user_id'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/chatbox/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['chatbox']
			})!

			_function_return(_result_function())
		},
		unignore: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'user_id'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/chatbox/ignore'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'DELETE',
				scopes: ['chatbox']
			})!

			_function_return(_result_function())
		},
	},
	__Notifications: {
		list: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/notifications'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		get: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/notifications/' + ctxt.notificationId + '/content'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		read: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'notification_id'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/notifications/read'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	__Tags: {
		popular: function () {
			var ctxt = _arguments()

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/tags'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/tags/list'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		tagged: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/tags/' + ctxt.tagId

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		find: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'tag'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/tags/find'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		}
	},
	__Search: {
		all: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'q',
				'tag',
				'forum_id',
				'user_id',
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		thread: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'q',
				'tag',
				'forum_id',
				'user_id',
				'page',
				'limit',
				'data_limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/threads'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		post: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'q',
				'tag',
				'forum_id',
				'user_id',
				'page',
				'limit',
				'data_limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		profile_posts: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'q',
				'user_id',
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/profile-posts'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		tag: function () {
			var ctxt = _arguments()

			if (ctxt.tags) {
				ctxt['tags[]'] = ctxt.tags.split(',')
			}

			var params = _LZTAPI.tools.cleanObject(ctxt, [
				'tag',
				'tags[]',
				'page',
				'limit'
			])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/tagged'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		users: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/users'

			var dataJ = _LZTAPI.tools.cleanObject(ctxt, ['q'])

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: dataJ,
				scopes: ['post']
			})!

			_function_return(_result_function())
		},
		results: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/search/' + ctxt.searchId + '/results'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	__Forms: {
		list: function () {
			var ctxt = _arguments()

			var params = _LZTAPI.tools.cleanObject(ctxt, ['page'])

			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forms'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: params,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'GET',
				scopes: ['read']
			})!

			_function_return(_result_function())
		},
		create: function () {
			var ctxt = _arguments()


			var timeout = Number(ctxt.timeout) || 5000
			var interval = Number(ctxt.interval) || 3000
			var maxTime = Number(ctxt.maxTime) || 60000

			var path = '/forms/save'

			_call_function(_LZTAPI.request.make, {
				path: path,
				params: null,
				timeout: timeout,
				interval: interval,
				maxTime: maxTime,
				method: 'POST',
				dataJ: null,
				scopes: ['post']
			})!

			_function_return(_result_function())
		}
	},
	navigation: function () {
		var ctxt = _arguments()

		var params = _LZTAPI.tools.cleanObject(ctxt, [
			'parent'
		])

		var timeout = Number(ctxt.timeout) || 5000
		var interval = Number(ctxt.interval) || 3000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = '/navigation'

		_call_function(_LZTAPI.request.make, {
			path: path,
			params: params,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime,
			method: 'GET',
			scopes: ['read']
		})!

		_function_return(_result_function())
	},
	batch: function () {
		var ctxt = _arguments()

		var dataJ = ctxt.jobs

		var timeout = Number(ctxt.timeout) || 5000
		var interval = Number(ctxt.interval) || 3000
		var maxTime = Number(ctxt.maxTime) || 60000

		var path = '/batch'

		_call_function(_LZTAPI.request.make, {
			path: path,
			params: null,
			timeout: timeout,
			interval: interval,
			maxTime: maxTime,
			method: 'POST',
			dataJ: dataJ
		})!

		_function_return(_result_function())
	}
}

