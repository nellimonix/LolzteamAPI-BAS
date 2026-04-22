<div class="container-fluid">
	<%= _.template($('#block_start').html())({
		id:"Options",
		name: tr("Options"),
		description: tr("All fields of this group are optional")
	}) %>
		<%= _.template($('#input_constructor').html())({
			id: "forum_id",
			description: tr("forum_id"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Id of the containing forum."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "creator_user_id",
			description: tr("creator_user_id"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Filter to get only threads created by the specified user."),
			}
		}) %>
		<%= _.template($('#radio').html())({
			id: "stickyAll",
			name: "sticky",
			title: tr("All threads"),
			checked: true
		}) %>
		<%= _.template($('#radio').html())({
			id: "sticky1",
			name: "sticky",
			title: tr("Only sticky threads")
		}) %>
		<%= _.template($('#radio').html())({
			id: "sticky0",
			name: "sticky",
			title: tr("Non-sticky threads")
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "thread_prefix_id",
			description: tr("thread_prefix_id"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Filter to get only threads with the specified prefix."),
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "thread_tag_id",
			description: tr("thread_tag_id"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Filter to get only threads with the specified tag."),
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "page",
			description: tr("page"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Page number of threads."),
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "limit",
			description: tr("limit"),
			default_selector: "int",
			disable_string: true,
			value_number: "",
			help: {
				description: tr("Number of threads in a page."),
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "order",
			description: tr("order"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				"natural",
				"thread_create_date",
				"thread_create_date_reverse",
				"thread_update_date",
				"thread_update_date_reverse",
				"thread_view_count",
				"thread_view_count_reverse",
				"thread_post_count",
				"thread_post_count_reverse",
				"first_post_likes",
				"first_post_likes_reverse",
			],
			help: {
				description: tr("Ordering of threads."),
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
	<div class="tr tooltip-paragraph-first-fold">List of threads in a forum (with pagination).</div>
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
