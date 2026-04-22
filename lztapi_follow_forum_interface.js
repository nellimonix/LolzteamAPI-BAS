<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id: "forumId",
        description: tr("forumId"),
        default_selector: "int",
        disable_string: true,
        value_number: "",
        help: {
            description: tr("Id of forum."),
        }
    }) %>
	<%= _.template($('#block_start').html())({
		id:"Options",
		name: tr("Options"),
		description: tr("All fields of this group are optional")
	}) %>
        <%= _.template($('#checkbox').html())({
			id: "post",
			title: tr("Whether to receive notification for post (<code>enabled</code>) or just thread (<code>disabled</code>)"),
			checked: false
		}) %>
        <%= _.template($('#checkbox').html())({
			id: "alert_",
			title: tr("Whether to receive notification as alert"),
			checked: false
		}) %>
        <%= _.template($('#checkbox').html())({
			id: "email",
			title: tr("Whether to receive notification as email"),
			checked: false
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "prefix_ids",
			description: tr("prefix_ids"),
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
			id: "minimal_contest_amount",
			description: tr("minimal_contest_amount"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Minimal contest amount. (Only for 766 forumId)"),
			}
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
			min_number:	1,
			max_number:	60,
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
			max_number:	1200,
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
			max_number:	1000000,
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
	<div class="tr tooltip-paragraph-first-fold">Follow a forum.</div>
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
