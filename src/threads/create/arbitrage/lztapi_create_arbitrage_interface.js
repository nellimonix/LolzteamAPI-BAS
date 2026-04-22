<div class="container-fluid">
	<%= _.template($('#info').html())({
		color: "red",
		description: tr('This function is not tested and in case of errors please contact the module creator!')
	}) %>
	<%= _.template($('#line').html())() %>
	<%= _.template($('#input_constructor').html())({
		id: "as_responder",
		description: tr("as_responder"),
		default_selector: "string",
		disable_int: true,
		value_string: "",
		help: {
			description: tr("To whom the complaint is filed. Specify a nickname or a link to the profile.")
		}
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "as_is_market_deal",
		title: tr("Did you buy account on the market?"),
		checked: true
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "as_amount",
		description: tr("as_amount"),
		default_selector: "int",
		disable_string: true,
		value_number: "",
		help: {
			description: tr("Indicate the amount by which the responder deceived you."),
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "transfer_type",
		description: tr("transfer_type"),
		visible_if_unchecked: "as_is_market_deal",
		default_selector: "string",
		disable_int: true,
		value_string: "",
		variants: ["guarantor","safe","notsafe"],
		help: {
			description: tr("The transaction took place through a guarantor or there was a transfer to the market with a hold?"),
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
	id: "post_body",
	description: tr("post_body"),
	default_selector: "string",
	disable_int: true,
	disable_editor: true,
	disable_expression: true,
	use_textarea: true,
	replace_linebreaks: true,
	size: 8,
	disable_type_chooser: true,
	textarea_height: 80,
	help: {
	description: tr("You should describe what's happened.<br><ul>" +
	"<li>describe the situation in a nutshell. If you wish, you can describe the situation in more detail using the \"Spoiler\" function</li>" +
	"<li>attach screenshots of correspondence. You must upload to the site Imgur - for convenience, use Ctrl + V when uploading screenshots to the album</li>" +
	"<li>other evidence</li><li>notify the respondent about the complaint you created, familiarize him with hidden content</li></ul>" +
	"Describe the situation in as much detail as possible.")
}
}) %>
	<%= _.template($('#block_start').html())({
		id:"Options",
		name: tr("Options"),
		description: tr("All fields of this group are optional")
	}) %>
		<%= _.template($('#input_constructor').html())({
			id: "as_market_item_id",
			description: tr("as_market_item_id"),
			visible_if_checked: "as_is_market_deal",
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Item id."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "as_data",
			description: tr("as_data"),
			visible_if_unchecked: "as_is_market_deal",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Contacts and wallets of the responder. Specify the known data about the responder (Skype, Vkontakte, Qiwi, WebMoney, etc.), if any."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "currency",
			description: tr("currency"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: ["rub","uah","kzt","byn","usd","eur","gbp","cny","try"],
			help: {
				description: tr("Currency of Arbitrage."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "pay_claim",
			description: tr("pay_claim"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: ["now","later"],
			help: {
				description: tr("Pay arbitrage claim now or later. (Only for <code>transfer_type = not_safe</code>)"),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "as_funds_receipt",
			description: tr("as_funds_receipt"),
			visible_if_unchecked: "as_is_market_deal",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Funds transfer recipient. Upload a receipt for the transfer of funds, use the \"View receipt\" button in your wallet. Must be uploaded to Imgur. Write \"no\" if you have not paid."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "as_tg_login_screenshot",
			description: tr("as_tg_login_screenshot"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Screenshot showing the respondent's Telegram login. If the correspondence was conducted in Telegram, upload a screenshot that will display the respondent's Telegram login against the background of your dialogue. The screenshot must be uploaded to Imgur. If the correspondence was conducted elsewhere, write \"no\"."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "tags",
			description: tr("tags"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Thread tags."),
				examples: [
					{code: "steam"},
					{code: "bas"},
					{code: "steam,bas", description: tr("Specify multiple tags.") + " " +  tr("Must be separated by <code>,</code>.")}
				]
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "hide_contacts",
			title: tr("Hide contacts"),
			checked: false
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "allow_ask_hidden_content",
			title: tr("Allow ask hidden content"),
			checked: false
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "reply_group",
			description: tr("reply_group"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				"0<br/><span style='color:rgb(43, 173, 114)'>" + tr("Only staff members and curators can reply in thread.") + "</span>",
				"2<br/><span style='color:rgb(43, 173, 114)'>" + tr("Everyone can reply in thread.") + "</span>",
				"21<br/><span style='color:rgb(43, 173, 114)'>" + tr("Local and higher can reply in thread.") + "</span>",
				"22<br/><span style='color:rgb(43, 173, 114)'>" + tr("Resident or higher can reply in thread.") + "</span>",
				"23<br/><span style='color:rgb(43, 173, 114)'>" + tr("Expert or higher can reply in thread.") + "</span>",
				"60<br/><span style='color:rgb(43, 173, 114)'>" + tr("Guru and higher can reply in thread.") + "</span>",
				"351<br/><span style='color:rgb(43, 173, 114)'>" + tr("Artificial Intelligence and higher can reply in thread.") + "</span>"
			],
			help: {
				description: tr("Allow to reply only users with chosen or higher group.")
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "comment_ignore_group",
			title: tr("Allow commenting if user can't post in thread"),
			checked: false
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "dont_alert_followers",
			title: tr("Don't alert followers about thread creation"),
			checked: false
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "watch_thread_state",
			title: tr("Watch thread state"),
			checked: true
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "watch_thread",
			visible_if_checked: "watch_thread_state",
			title: tr("Receive forum notifications of new posts in this thread."),
			checked: true
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "watch_thread_email",
			visible_if_checked: "watch_thread_state",
			title: tr("Receive email notifications of new posts in this thread."),
			checked: false
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#block_start').html())({
		id:"Requests",
		name: tr("Requests delivery"),
		description: tr("It is recommended to leave the default settings, or increase them if you have a slow Internet connection")
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "timeout",
		description: tr("Timeout"),
		default_selector: "int",
		disable_string: true,
		value_number: 5,
		min_number: 1,
		max_number: 60,
		help: {
			description: tr("Maximum waiting time per request."),
			examples: [
				{code: 1, description: tr("Wait 1 second.")},
				{code: 5, description: tr("Wait 5 seconds.")},
				{code: 10, description: tr("Wait 10 seconds.")}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "interval",
		description: tr("Interval"),
		default_selector: "int",
		disable_string: true,
		value_number: 3,
		min_number: 1,
		max_number: 1200,
		help: {
			description: tr("Interval for sending requests."),
			examples: [
				{code: 1, description: tr("Send request every second.")},
				{code: 5, description: tr("Send request every 5 seconds.")},
				{code: 10, description: tr("Send request every 10 seconds.")}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "maxTime",
		description: tr("Time threshold"),
		default_selector: "int",
		disable_string: true,
		value_number: 10,
		min_number: 1,
		max_number: 1000000,
		help: {
			description: tr("Maximum execution time."),
			examples: [
				{code: 1, description: tr("Perform an action no more than 1 second.")},
				{code: 5, description: tr("Perform an action no more than 5 seconds.")},
				{code: 10, description: tr("Perform an action no more than 10 seconds.")}
			]
		}
	}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#variable_constructor').html())({
		id: "Save",
		description: tr("Variable to save the result"),
		default_variable: "LZTAPI_RESPONSE",
	}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Create a Arbitrage.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
<script type="text/javascript">
	$(document).ready(function(){
		let lztOkButton = document.getElementById('ok')
		lztOkButton.style.backgroundColor = '#2BAD72'
		lztOkButton.style.borderColor = '#009a63'
		let lztBackButton = document.getElementById('backtomain')
		lztBackButton.style.backgroundColor = '#884444'
		lztBackButton.style.borderColor = '#884535'
	});
</script>