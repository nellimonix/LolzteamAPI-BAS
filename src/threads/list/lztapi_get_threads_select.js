var forum_id = GetInputConstructorValue('forum_id', loader)
var creator_user_id = GetInputConstructorValue('creator_user_id', loader)
var thread_prefix_id = GetInputConstructorValue('thread_prefix_id', loader)
var thread_tag_id = GetInputConstructorValue('thread_tag_id', loader)
var page = GetInputConstructorValue('page', loader)
var limit = GetInputConstructorValue('limit', loader)
var order = GetInputConstructorValue('order', loader)

var sticky1 = $('#sticky1').is(':checked')
var sticky0 = $('#sticky0').is(':checked')

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
		_.template($('#lztapi_get_threads_code').html())({
			forum_id: forum_id['updated'],
			creator_user_id: creator_user_id['updated'],
			sticky1: sticky1,
			sticky0: sticky0,
            thread_prefix_id: thread_prefix_id['updated'],
			thread_tag_id: thread_tag_id['updated'],
			page: page['updated'],
            limit: limit['updated'],
			order: order['updated'],
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
