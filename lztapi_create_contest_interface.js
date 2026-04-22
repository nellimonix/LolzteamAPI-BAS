<div class="container-fluid">
	<%= _.template($('#info').html())({
		color: "red",
		description: tr('This function is not tested and in case of errors please contact the module creator!')
	}) %>
	<%= _.template($('#line').html())() %>
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
			description: tr("Content of the new contest.")
		}
	}) %>
	<%= _.template($('#header').html())({
		name: tr('Prize')
	}) %>
	<%= _.template($('#radio').html())({
		id: "money",
		name: "prize_type",
		title: tr("Money"),
		checked: true
	}) %>
	<%= _.template($('#radio').html())({
		id: "upgrades",
		name: "prize_type",
		title: tr("Upgrades")
	}) %>
	<%= _.template($('#header').html())({
		name: tr('Conditions for participation')
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "require_like_count",
		description: tr("require_like_count"),
		default_selector: "int",
		disable_string: true,
		value_number: 1,
		help: {
			description: tr("Sympathies for this week."),
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "require_total_like_count",
		description: tr("require_total_like_count"),
		default_selector: "int",
		disable_string: true,
		value_number: 200,
		help: {
			description: tr("Sympathies for all time."),
		}
	}) %>
	<%= _.template($('#block_start').html())({
		id:"Options",
		name: tr("Options"),
		description: tr("All fields of this group are optional")
	}) %>
		<%= _.template($('#input_constructor').html())({
			id: "title",
			description: tr("title"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Thread title.") + " " + tr("Can be skipped if <code>title_en</code> set.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "title_en",
			description: tr("title_en"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Thread english title.") + " " + tr("Can be skipped if <code>title</code> set.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "length_value",
			description: tr("length_value"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Giveaway duration value. The maximum duration is 3 days."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "length_option",
			description: tr("length_option"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: ["minutes","hours","days"],
			help: {
				description: tr("Giveaway duration type. The maximum duration is 3 days."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "count_winners",
			description: tr("count_winners"),
			visible_if_checked: "money",
			default_selector: "int",
			disable_string: true,
			value_number: 1,
			help: {
				description: tr("Winner count (prize count)."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "prize_data_money",
			description: tr("prize_data_money"),
			visible_if_checked: "money",
			default_selector: "int",
			disable_string: true,
			value_number: 500,
			help: {
				description: tr("How much money will each winner receive."),
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "is_money_places",
			visible_if_checked: "money",
			title: tr("Enable the distribution of money prizes by places"),
			checked: false
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "prize_data_places",
			description: tr("prize_data_places"),
			visible_if_checked: "is_money_places",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("How much money will receive each place."),
				examples: [
					{code: "1500,1000,500", description: tr("Specify multiple prizes.") + " " +  tr("Must be separated by <code>,</code>.")},
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "prize_data_upgrade",
			description: tr("prize_data_upgrade"),
			visible_if_checked: "upgrades",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				"1<br/><span style='color:rgb(43, 173, 114)'>" + tr("Supreme - 3 months.") + "</span>",
				"6<br/><span style='color:rgb(43, 173, 114)'>" + tr("Legend - 12 months.") + "</span>",
				"12<br/><span style='color:rgb(43, 173, 114)'>" + tr("AntiPublic.One Plus subscription - 1 month.") + "</span>",
				"14<br/><span style='color:rgb(43, 173, 114)'>" + tr("Uniq - lifetime.") + "</span>",
				"17<br/><span style='color:rgb(43, 173, 114)'>" + tr("18+ Photo leaks - 6 months.") + "</span>",
				"19<br/><span style='color:rgb(43, 173, 114)'>" + tr("Auto giveaway participation - 1 month.") + "</span>"
			],
			help: {
				description: tr("Which upgrade will each winner receive.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "secret_answer",
			description: tr("secret_answer"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Secret answer of your account."),
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
	<div class="tr tooltip-paragraph-first-fold">Create a new contest.</div>
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