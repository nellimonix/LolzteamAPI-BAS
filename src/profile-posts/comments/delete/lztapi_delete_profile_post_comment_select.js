var comment_id = GetInputConstructorValue('comment_id', loader)
if (comment_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('comment_id') + tr('" is not specified'))
	return
}

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
		_.template($('#lztapi_delete_profile_post_comment_code').html())({
			comment_id: comment_id['updated'],
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