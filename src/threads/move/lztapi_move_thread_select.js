var threadId = GetInputConstructorValue('threadId', loader)
if (threadId['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('threadId') + tr('" is not specified'))
	return
}
var node_id = GetInputConstructorValue('node_id', loader)
if (node_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('node_id') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
var title_en = GetInputConstructorValue('title_en', loader)
var prefix_ids = GetInputConstructorValue('prefix_ids', loader)

var apply_thread_prefix = $("#discussion_open").is(':checked');
var send_alert = $("#hide_contacts").is(':checked');

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
		_.template($('#lztapi_move_thread_code').html())({
			threadId: threadId['updated'],
            node_id: node_id['updated'],
			title: title['updated'],
			title_en: title_en['updated'],
			prefix_ids: prefix_ids['updated'],
            apply_thread_prefix: apply_thread_prefix,
			send_alert: send_alert,
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
