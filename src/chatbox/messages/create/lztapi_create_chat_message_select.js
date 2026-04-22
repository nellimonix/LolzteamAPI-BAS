var room_id = GetInputConstructorValue('room_id', loader)
if (room_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('room_id') + tr('" is not specified'))
	return
}

var message = GetInputConstructorValue('message', loader)
if (message['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('message') + tr('" is not specified'))
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
		_.template($('#lztapi_create_chat_message_code').html())({
			room_id: room_id['updated'],
            message: message['updated'],
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
