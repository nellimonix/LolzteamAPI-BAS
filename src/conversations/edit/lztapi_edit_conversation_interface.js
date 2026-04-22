<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "conversation_id",
		description: tr("conversation_id"),
		default_selector: "int",
		disable_string: true,
		value_number: "",
		help: {
			description: tr("Id of conversation.")
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
			description: tr("New conversation title.")
		}
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "open_invite",
		title: tr("Allow members to invite others."),
		checked: false
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "history_open",
		title: tr("Make conversation history visible to new members."),
		checked: false
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "allow_edit_messages",
		title: tr("Allow members to edit their own messages."),
		checked: false
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "allow_sticky_messages",
		title: tr("Allow members to stick messages."),
		checked: false
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "allow_delete_own_messages",
		title: tr("Allow members to delete their own messages."),
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
	<div class="tr tooltip-paragraph-first-fold">Edit conversation settings.</div>
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