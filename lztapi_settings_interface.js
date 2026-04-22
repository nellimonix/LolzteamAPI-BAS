<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "token",
		description: tr("Token"),
		default_selector: "string",
		disable_int: true,
		value_string: "",
		help: {
			description: tr("You can find the API access token on the /account/api page."),
			examples: [
				{code: "eyJ0eXAiOiJKV1QiLCJhbG*********c5LTN2hUkg2g"},
				{code: "eyJ0eXAiOiJKV1QiLCJhbG*******HzCEHDeuE0gA1D8"},
				{code: "eyJ0eXAiOiJKV1QiLCJhbG*********5qQiwhw2QF4g"}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "baseUrl",
		description: tr("BaseUrl"),
		default_selector: "string",
		disable_int: true,
		value_string: "api.zelenka.guru",
		variants: ["api.zelenka.guru"],
	}) %>
	<%= _.template($('#block_start').html())({id:"SettingsProxy", name: tr("Proxy Settings"), description: tr("By default, the LOLZ API works without a proxy, this action installs a proxy")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "proxy",
			description: tr("Proxy"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("String with information about proxy. It may contain ip, port, proxy type in different formats. This string may also contain login and password, if it doesn't, auth can be set with \"Proxy Login\" and \"Proxy Password\" parameters."),
				examples: [
					{code:"210.10.10.10:1085"},
					{code:"username:password@210.10.10.10:1085"},
					{code:"socks5://210.10.10.10:1085"},
					{code:"socks:210.10.10.10:1085:username:password"},
					{code:"http:username:password:210.10.10.10:1085"},
					{code:"{{proxy}}", description: tr("Get from resource")},
					{code:tr("Empty string"), description:tr("Without proxy")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "proxy_type",
			description: tr("Proxy Type"),
			default_selector: "string",
			disable_int: true,
			value_string: "http",
			variants: ["http","socks5","auto"],
			help: {
				description: tr("socks5 and http proxy types are supported."),
				examples: [
					{code:"socks"},
					{code:"socks5", description:tr("Same as socks")},
					{code:"http"},
					{code:"https", description:tr("Same as http")}
				]
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "use_proxy",
			title: tr("Use a proxy"),
			checked: false
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#block_start').html())({id:"ReassigningErrors", name: tr("Reassigning errors"), description: tr("It is recommended to leave the default settings")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "failErrors",
			description: "Fail",
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes that calls <code>Fail</code> action."),
				examples: [
					{code: "SYSTEM_ERROR"},
					{code: "SYSTEM_ERROR,unknown", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['SYSTEM_ERROR','unknown']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "failStop",
			title: tr("Dont restart thread."),
			checked: false
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "dieErrors",
			description: tr("Script End"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes that calls <code>Script End</code> action."),
				examples: [
					{code: "BAD_TOKEN"},
					{code: "BAD_CONTEST_TYPE,BAD_PRIZE_TYPE", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['BAD_CONTEST_TYPE','BAD_PRIZE_TYPE']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
		<%= _.template($('#checkbox').html())({
			id: "dieInstantly",
			title: tr("Finish script instantly."),
			checked: false
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "ignoreErrors",
			description: tr("Ignore Errors"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Error codes to ignore."),
				examples: [
					{code: "WAIT_LINK"},
					{code: "REQUEST_FAILED,REQUEST_TIMEOUT", description: tr("Multiple error codes.") + " " + tr("Must be separated by <code>,</code>.") },
					{code: "['REQUEST_FAILED','REQUEST_TIMEOUT']", description: tr("Multiple error codes.") },
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#checkbox').html())({
		id: "bypass_429",
		title: tr("Bypass status code 429 by sleep"),
		checked: true
	}) %>
	<%= _.template($('#checkbox').html())({
		id: "debug",
		title: tr("Enable debug mode"),
		checked: false
	}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Set default settings</div>
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