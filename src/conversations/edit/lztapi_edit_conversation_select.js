var conversation_id = GetInputConstructorValue('conversation_id', loader)
if (conversation_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('conversation_id') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
var open_invite = $("#open_invite").is(':checked');
var history_open = $("#history_open").is(':checked');
var allow_edit_messages = $("#allow_edit_messages").is(':checked');
var allow_sticky_messages = $("#allow_sticky_messages").is(':checked');
var allow_delete_own_messages = $("#allow_delete_own_messages").is(':checked');

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
		_.template($('#lztapi_edit_conversation_code').html())({
			conversation_id: conversation_id['updated'],
			title: title['updated'],
			open_invite: open_invite,
			history_open: history_open,
			allow_edit_messages: allow_edit_messages,
			allow_sticky_messages: allow_sticky_messages,
			allow_delete_own_messages: allow_delete_own_messages,
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