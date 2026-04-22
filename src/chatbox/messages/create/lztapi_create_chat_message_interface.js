<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "room_id",
		description: tr("room_id"),
		default_selector: "int",
		disable_string: true,
		value_number: "",
		variants: [
			"1<br/><span style='color:rgb(43, 173, 114)'>" + "[Russian] " + tr("Chat") + "</span>",
			"2<br/><span style='color:rgb(43, 173, 114)'>" + "[English] " + tr("Chat") + "</span>",
			"3<br/><span style='color:rgb(43, 173, 114)'>" + "[Russian] " + tr("Market chat") + "</span>",
			"4<br/><span style='color:rgb(43, 173, 114)'>" + "[English] " + tr("Market chat") + "</span>",
			"8<br/><span style='color:rgb(43, 173, 114)'>" + tr("Newbie chat") + "</span>",
			"9<br/><span style='color:rgb(43, 173, 114)'>" + "[Russian] " + tr("Marketplace") + "</span>",
			"10<br/><span style='color:rgb(43, 173, 114)'>" + "[English] " + tr("Marketplace") + "</span>",
			"11<br/><span style='color:rgb(43, 173, 114)'>" + ("[Russian] ChatGPT") + "</span>",
			"12<br/><span style='color:rgb(43, 173, 114)'>" + ("[English] ChatGPT") + "</span>"
		],
		help: {
			description: tr("Room id."),
		}
	}) %>
    <%= _.template($('#input_constructor').html())({
        id: "message",
        description: tr("message"),
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
            description: tr("Content of the chat message.")
        }
    }) %>
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
	<div class="tr tooltip-paragraph-first-fold">Create chat message.</div>
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
