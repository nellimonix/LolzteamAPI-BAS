var as_is_market_deal = $("#as_is_market_deal").is(':checked');
var as_responder = GetInputConstructorValue('as_responder', loader)
if (as_responder['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('as_responder') + tr('" is not specified'))
	return
}
var as_amount = GetInputConstructorValue('as_amount', loader)
if (as_amount['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('as_amount') + tr('" is not specified'))
	return
}

var post_body = GetInputConstructorValue('post_body', loader)
if (post_body['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('post_body') + tr('" is not specified'))
	return
}

var as_market_item_id = GetInputConstructorValue('as_market_item_id', loader)
var as_data = GetInputConstructorValue('as_data', loader)
var currency = GetInputConstructorValue('currency', loader)

var transfer_type = GetInputConstructorValue('transfer_type', loader)
if (!as_is_market_deal && transfer_type['original'].length == 0) {
	Invalid(tr('The parameter "') + tr('transfer_type') + tr('" is not specified'))
	return
}
var pay_claim = GetInputConstructorValue('pay_claim', loader)
var as_funds_receipt = GetInputConstructorValue('as_funds_receipt', loader)
var as_tg_login_screenshot = GetInputConstructorValue('as_tg_login_screenshot', loader)

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
		_.template($('#lztapi_create_arbitrage_code').html())({
			as_is_market_deal: as_is_market_deal,
			as_responder: as_responder['updated'],
			as_amount: as_amount['updated'],
			as_market_item_id: as_market_item_id['updated'],
			as_data: as_data['updated'],
			currency: currency['updated'],
			transfer_type: transfer_type['updated'],
			pay_claim: pay_claim['updated'],
			as_funds_receipt: as_funds_receipt['updated'],
			as_tg_login_screenshot: as_tg_login_screenshot['updated'],
			post_body: post_body['updated'],
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
