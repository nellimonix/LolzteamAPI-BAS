var token = GetInputConstructorValue('token', loader)
if (token['original'].length === 0) {
	Invalid(tr('The parameter "') + tr('Token') + tr('" is not specified'))
	return
}
var baseUrl = GetInputConstructorValue('baseUrl', loader)
if (baseUrl['original'].length === 0) {
	Invalid(tr('The parameter "') + tr('BaseUrl') + tr('" is not specified'))
	return
}

var use_proxy = $('#use_proxy').is(':checked')
var proxy = GetInputConstructorValue('proxy', loader)
var proxy_type = GetInputConstructorValue('proxy_type', loader)
if (use_proxy && proxy['original'].length === 0) {
	Invalid(tr('The parameter "') + tr('Proxy') + tr('" is not specified'))
	return
}
if (use_proxy && proxy_type['original'].length === 0) {
	Invalid(tr('The parameter "') + tr('Proxy Type') + tr('" is not specified'))
	return
}
var failErrors = GetInputConstructorValue('failErrors', loader)
var failStop = $('#failStop').is(':checked')
var dieErrors = GetInputConstructorValue('dieErrors', loader)
var dieInstantly = $('#dieInstantly').is(':checked')
var ignoreErrors = GetInputConstructorValue('ignoreErrors', loader)

var debug = $('#debug').is(':checked')
var bypass_429 = $('#bypass_429').is(':checked')
var check_updates = $('#check_updates').is(':checked')

try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#lztapi_settings_code').html())({
			token: token['updated'],
			baseUrl: baseUrl['updated'],
			proxy: proxy['updated'],
			proxy_type: proxy_type['updated'],
			use_proxy: use_proxy,
			failErrors: failErrors['updated'],
			failStop: failStop,
			dieErrors: dieErrors['updated'],
			dieInstantly: dieInstantly,
			ignoreErrors: ignoreErrors['updated'],
			debug: debug,
			bypass_429: bypass_429
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
