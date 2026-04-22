var username = GetInputConstructorValue('username', loader)
var user_email = GetInputConstructorValue('user_email', loader)
var custom_fields = GetInputConstructorValue('custom_fields', loader)
var location = GetInputConstructorValue('location', loader)
var occupation = GetInputConstructorValue('occupation', loader)
var homepage = GetInputConstructorValue('homepage', loader)
var interests = GetInputConstructorValue('interests', loader)
var lztInnovationLink = GetInputConstructorValue('lztInnovationLink', loader)
var lztInnovation20Link = GetInputConstructorValue('lztInnovation20Link', loader)
var lztInnovation30Link = GetInputConstructorValue('lztInnovation30Link', loader)
var scamURL = GetInputConstructorValue('scamURL', loader)
var maecenasValue = GetInputConstructorValue('maecenasValue', loader)
var telegram = GetInputConstructorValue('telegram', loader)
var vk = GetInputConstructorValue('vk', loader)
var steam = GetInputConstructorValue('steam', loader)
var jabber = GetInputConstructorValue('jabber', loader)
var lztDeposit = GetInputConstructorValue('lztDeposit', loader)
var ban_reason = GetInputConstructorValue('ban_reason', loader)

var timeout = GetInputConstructorValue('timeout', loader)
if (timeout['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Timeout') + tr('" is not specified'))
	return
}
var interval = GetInputConstructorValue('interval', loader)
if (interval['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('Interval') + tr('" is not specified'))
	return
}
var maxTime = GetInputConstructorValue('maxTime', loader)
if (maxTime['original'].length == 0) {
	Invalid(
		tr('The parameter "') + tr('Time threshold') + tr('" is not specified')
	)
	return
}
var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#lztapi_find_users_code').html())({
			username: username['updated'],
			user_email: user_email['updated'],
			custom_fields: custom_fields['updated'],
			location: location['updated'],
			occupation: occupation['updated'],
			homepage: homepage['updated'],
		    interests: interests['updated'],
			lztInnovationLink: lztInnovationLink['updated'],
			lztInnovation20Link: lztInnovation20Link['updated'],
			lztInnovation30Link: lztInnovation30Link['updated'],
			scamURL: scamURL['updated'],
			maecenasValue: maecenasValue['updated'],
			telegram: telegram['updated'],
			vk: vk['updated'],
			steam: steam['updated'],
		    jabber: jabber['updated'],
			lztDeposit: lztDeposit['updated'],
			ban_reason: ban_reason['updated'],
			timeout: timeout['updated'],
			maxTime: maxTime['updated'],
			interval: interval['updated'],
			variable: 'VAR_' + Save
		})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append(
		'',
		BrowserAutomationStudio_SaveControls() + code,
		action,
		DisableIfAdd
	)
} catch (e) {}
