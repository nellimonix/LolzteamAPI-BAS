var forum_id = GetInputConstructorValue('forum_id', loader)
if (forum_id['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('forum_id') + tr('" is not specified'))
	return
}
var post_body = GetInputConstructorValue('post_body', loader)
if (post_body['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('post_body') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
var title_en = GetInputConstructorValue('title_en', loader)
var prefix_ids = GetInputConstructorValue('prefix_ids', loader)
var tags = GetInputConstructorValue('tags', loader)

var hide_contacts = $("#hide_contacts").is(':checked');
var allow_ask_hidden_content = $("#allow_ask_hidden_content").is(':checked');

var reply_group = GetInputConstructorValue('reply_group', loader)

var comment_ignore_group = $("#comment_ignore_group").is(':checked');
var dont_alert_followers = $("#dont_alert_followers").is(':checked');
var watch_thread_state = $("#watch_thread_state").is(':checked');
var watch_thread = $("#watch_thread").is(':checked');
var watch_thread_email = $("#watch_thread_email").is(':checked');

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
		_.template($('#lztapi_create_thread_code').html())({
			forum_id: forum_id['updated'],
			post_body: post_body['updated'],
			title: title['updated'],
			title_en: title_en['updated'],
			prefix_ids: prefix_ids['updated'],
			tags: tags['updated'],
			hide_contacts: hide_contacts,
			allow_ask_hidden_content: allow_ask_hidden_content,
			reply_group: reply_group['updated'],
			comment_ignore_group: comment_ignore_group,
			dont_alert_followers: dont_alert_followers,
			watch_thread_state: watch_thread_state,
			watch_thread: watch_thread,
			watch_thread_email: watch_thread_email,
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
