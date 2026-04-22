var userId = GetInputConstructorValue('userId', loader)
if (userId['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('userId') + tr('" is not specified'))
	return
}

var ignore_conversations = $("#ignore_conversations").is(':checked');
var ignore_content = $("#ignore_content").is(':checked');
var restrict_view_profile = $("#restrict_view_profile").is(':checked');

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
	Invalid(tr('The parameter "') + tr('Time threshold') + tr('" is not specified'))
	return
}
var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#lztapi_edit_ignore_user_code').html())({
			userId: userId['updated'],
			ignore_conversations: ignore_conversations,
			ignore_content: ignore_content,
			restrict_view_profile: restrict_view_profile,
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