var is_group = $("#is_group").is(':checked');

var recipient_id = GetInputConstructorValue('recipient_id', loader)
if (!is_group && recipient_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('recipient_id') + tr('" is not specified'))
	return
}
var recipients = GetInputConstructorValue('recipients', loader)
if (is_group && recipients['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('recipients') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
if (is_group && title['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('title') + tr('" is not specified'))
	return
}

var open_invite = $("#open_invite").is(':checked');
var conversation_locked = $("#conversation_locked").is(':checked');
var allow_edit_messages = $("#allow_edit_messages").is(':checked');

var message_body = GetInputConstructorValue('message_body', loader)
if (!is_group && message_body['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('message_body') + tr('" is not specified'))
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
	Invalid(
		tr('The parameter "') + tr('Time threshold') + tr('" is not specified')
	)
	return
}
var Save = this.$el.find('#Save').val().toUpperCase()
try {
	var code =
		loader.GetAdditionalData() +
		_.template($('#lztapi_create_conversation_code').html())({
			is_group: is_group,
			recipient_id: recipient_id['updated'],
			recipients: recipients['updated'],
			title: title['updated'],
			open_invite: open_invite,
			conversation_locked: conversation_locked,
			allow_edit_messages: allow_edit_messages,
			message_body: message_body['updated'],
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
