var userId = GetInputConstructorValue('userId', loader)
if (userId['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('userId') + tr('" is not specified'))
	return
}

var node_id = GetInputConstructorValue('node_id', loader)
var like_type = GetInputConstructorValue('like_type', loader)
var type = GetInputConstructorValue('type', loader)
var page = GetInputConstructorValue('page', loader)
var content_type = GetInputConstructorValue('content_type', loader)
var search_user_id = GetInputConstructorValue('search_user_id', loader)
var stats = $("#stats").is(':checked');

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
		_.template($('#lztapi_get_user_likes_code').html())({
			userId: userId['updated'],
			node_id: node_id['updated'],
			like_type: like_type['updated'],
			type: type['updated'],
			page: page['updated'],
			content_type: content_type['updated'],
			search_user_id: search_user_id['updated'],
			stats: stats,
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