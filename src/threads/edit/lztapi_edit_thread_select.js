var threadId = GetInputConstructorValue('threadId', loader)
if (threadId['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('threadId') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
var title_en = GetInputConstructorValue('title_en', loader)
var prefix_ids = GetInputConstructorValue('prefix_ids', loader)
var tags = GetInputConstructorValue('tags', loader)

var discussion_open = $("#discussion_open").is(':checked');
var hide_contacts = $("#hide_contacts").is(':checked');
var allow_ask_hidden_content = $("#allow_ask_hidden_content").is(':checked');

var reply_group = GetInputConstructorValue('reply_group', loader)

var comment_ignore_group = $("#comment_ignore_group").is(':checked');

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
		_.template($('#lztapi_edit_thread_code').html())({
			threadId: threadId['updated'],
			title: title['updated'],
			title_en: title_en['updated'],
			prefix_ids: prefix_ids['updated'],
			tags: tags['updated'],
            discussion_open: discussion_open,
			hide_contacts: hide_contacts,
			allow_ask_hidden_content: allow_ask_hidden_content,
			reply_group: reply_group['updated'],
			comment_ignore_group: comment_ignore_group,
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
