var userId = GetInputConstructorValue('userId', loader)
if (userId['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('userId') + tr('" is not specified'))
	return
}

var user_title = GetInputConstructorValue('user_title', loader)
var primary_group_id = GetInputConstructorValue('primary_group_id', loader)
var secondary_group_ids = GetInputConstructorValue('secondary_group_ids', loader)
var display_group_id = GetInputConstructorValue('display_group_id', loader)
var user_dob_day = GetInputConstructorValue('user_dob_day', loader)
var user_dob_month = GetInputConstructorValue('user_dob_month', loader)
var user_dob_year = GetInputConstructorValue('user_dob_year', loader)
var location = GetInputConstructorValue('location', loader)
var occupation = GetInputConstructorValue('occupation', loader)
var homepage = GetInputConstructorValue('homepage', loader)
var interests = GetInputConstructorValue('interests', loader)
var lztInnovationLink = GetInputConstructorValue('lztInnovationLink', loader)
var lztInnovation20Link = GetInputConstructorValue('lztInnovation20Link', loader)
var lztInnovation30Link = GetInputConstructorValue('lztInnovation30Link', loader)
var telegram = GetInputConstructorValue('telegram', loader)
var vk = GetInputConstructorValue('vk', loader)
var steam = GetInputConstructorValue('steam', loader)
var jabber = GetInputConstructorValue('jabber', loader)
var discord = GetInputConstructorValue('discord', loader)

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
		_.template($('#lztapi_edit_user_code').html())({
			userId: userId['updated'],
			user_title: user_title['updated'],
			primary_group_id: primary_group_id['updated'],
			secondary_group_ids: secondary_group_ids['updated'],
            display_group_id: display_group_id['updated'],
            user_dob_day: user_dob_day['updated'],
            user_dob_month: user_dob_month['updated'],
            user_dob_year: user_dob_year['updated'],
			location: location['updated'],
			occupation: occupation['updated'],
			homepage: homepage['updated'],
		    interests: interests['updated'],
			lztInnovationLink: lztInnovationLink['updated'],
			lztInnovation20Link: lztInnovation20Link['updated'],
			lztInnovation30Link: lztInnovation30Link['updated'],
			telegram: telegram['updated'],
			vk: vk['updated'],
			steam: steam['updated'],
		    jabber: jabber['updated'],
            discord: discord['updated'],
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
