<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "threadId",
		description: tr("threadId"),
		default_selector: "int",
		disable_string: true,
		value_number: "",
		help: {
			description: tr("Id of thread.")
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
				description: tr("Thread title.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "title_en",
			description: tr("title_en"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Thread english title.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "prefix_id",
			description: tr("prefix_id"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Prefix ids."),
				examples: [
					{code: "493"},
					{code: "495"},
					{code: "493,495", description: tr("Specify multiple prefix IDs.") + " " +  tr("Must be separated by <code>,</code>.")}
				]
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
			id: "discussion_open",
			title: tr("Discussion state: Open"),
			checked: true
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
	<div class="tr tooltip-paragraph-first-fold">Edit a thread.</div>
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