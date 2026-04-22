var prize_type = `"${$('[name="prize_type"]:checked').attr('id')}"`

var require_like_count = GetInputConstructorValue('require_like_count', loader)
if (require_like_count['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('require_like_count') + tr('" is not specified'))
	return
}
var require_total_like_count = GetInputConstructorValue('require_total_like_count', loader)
if (require_total_like_count['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('require_total_like_count') + tr('" is not specified'))
	return
}

var post_body = GetInputConstructorValue('post_body', loader)
if (post_body['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('post_body') + tr('" is not specified'))
	return
}

var title = GetInputConstructorValue('title', loader)
var title_en = GetInputConstructorValue('title_en', loader)

var length_value = GetInputConstructorValue('length_value', loader)
var length_option = GetInputConstructorValue('length_option', loader)
var count_winners = GetInputConstructorValue('count_winners', loader)
var prize_data_money = GetInputConstructorValue('prize_data_money', loader)
var is_money_places = $("#is_money_places").is(':checked');
var prize_data_places = GetInputConstructorValue('prize_data_places', loader)
var prize_data_upgrade = GetInputConstructorValue('prize_data_upgrade', loader)
var secret_answer = GetInputConstructorValue('secret_answer', loader)

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
		_.template($('#lztapi_create_contest_code').html())({
			prize_type: prize_type,
			require_like_count: require_like_count['updated'],
			require_total_like_count: require_total_like_count['updated'],
			length_value: length_value['updated'],
			length_option: length_option['updated'],
			count_winners: count_winners['updated'],
			prize_data_money: prize_data_money['updated'],
			is_money_places: is_money_places,
			prize_data_places: prize_data_places['updated'],
			prize_data_upgrade: prize_data_upgrade['updated'],
			secret_answer: secret_answer['updated'],
			post_body: post_body['updated'],
			title: title['updated'],
			title_en: title_en['updated'],
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
