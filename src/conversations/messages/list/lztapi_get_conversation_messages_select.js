var conversation_id = GetInputConstructorValue('conversation_id', loader)
if (conversation_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('conversation_id') + tr('" is not specified'))
	return
}

var page = GetInputConstructorValue('page', loader)
var limit = GetInputConstructorValue('limit', loader)
var order = GetInputConstructorValue('order', loader)
var before = GetInputConstructorValue('before', loader)
var after = GetInputConstructorValue('after', loader)

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
		_.template($('#lztapi_get_conversation_messages_code').html())({
            conversation_id: conversation_id['updated'],
			page: page['updated'],
			limit: limit['updated'],
			order: order['updated'],
			before: before['updated'],
			after: after['updated'],
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
