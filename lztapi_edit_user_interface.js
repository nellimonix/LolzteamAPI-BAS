<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "userId",
		description: tr("userId"),
		default_selector: "int",
		disable_string: true,
		value_number: "",
		help: {
			description: tr("User id.")
		}
	}) %>
	<%= _.template($('#block_start').html())({
		id:"Options",
		name: tr("Options"),
		description: tr("All fields of this group are optional")
	}) %>
		<%= _.template($('#input_constructor').html())({
			id: "user_title",
			description: tr("user_title"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("New custom title of the user.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "primary_group_id",
			description: tr("primary_group_id"),
            default_selector: "int",
            disable_string: true,
            value_number: "",
			help: {
				description: tr("Id of new primary group. (Require admincp scope)")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "secondary_group_ids",
			description: tr("secondary_group_ids"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("List ids of new secondary groups. (Require admincp scope)"),
                examples: [
					{code: "1"},
					{code: "2"},
					{code: "1,2", description: tr("Specify multiple secondary groups ids.") + " " +  tr("Must be separated by <code>,</code>.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "display_group_id",
			description: tr("display_group_id"),
            default_selector: "int",
            disable_string: true,
            value_number: "",
			help: {
				description: tr("Id of group you want to display.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "user_dob_day",
			description: tr("user_dob_day"),
            default_selector: "int",
            disable_string: true,
            value_number: "",
			help: {
				description: tr("Your date of birth (day).")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "user_dob_month",
			description: tr("user_dob_month"),
            default_selector: "int",
            disable_string: true,
            value_number: "",
			help: {
				description: tr("Your date of birth (month).")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "user_dob_year",
			description: tr("user_dob_year"),
            default_selector: "int",
            disable_string: true,
            value_number: "",
			help: {
				description: tr("Your date of birth (year).")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "location",
			description: tr("location"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User location field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "occupation",
			description: tr("occupation"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User occupation field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "homepage",
			description: tr("homepage"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User homepage field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "interests",
			description: tr("interests"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User interests field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "lztInnovationLink",
			description: tr("lztInnovationLink"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User thread link for \"innovator\" trophy.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "lztInnovation20Link",
			description: tr("lztInnovation20Link"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User thread link for \"innovator 2.0\" trophy.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "lztInnovation30Link",
			description: tr("lztInnovation30Link"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User thread link for \"innovator 3.0\" trophy.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "telegram",
			description: tr("telegram"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User telegram field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "vk",
			description: tr("vk"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User vk field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "steam",
			description: tr("steam"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User steam field.")
			}
		}) %>
        <%= _.template($('#input_constructor').html())({
			id: "jabber",
			description: tr("jabber"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("User jabber field.")
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "discord",
			description: tr("discord"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Your discord.")
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
	<div class="tr tooltip-paragraph-first-fold">Edit a user.</div>
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