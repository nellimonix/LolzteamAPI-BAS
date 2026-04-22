var conversation_id = GetInputConstructorValue('conversation_id', loader)
if (conversation_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('conversation_id') + tr('" is not specified'))
	return
}
var delete_type = GetInputConstructorValue('delete_type', loader)
if (delete_type['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('delete_type') + tr('" is not specified'))
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
		_.template($('#lztapi_delete_conversation_code').html())({
			conversation_id: conversation_id['updated'],
			delete_type: delete_type['updated'],
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