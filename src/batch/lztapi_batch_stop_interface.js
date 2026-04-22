<div class="container-fluid">
    <%= _.template($('#variable_constructor').html())({
        id: "Save",
        description: tr("Variable to save the result"),
        default_variable: "LZTAPI_JOBS",
    })%>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Stop recording batch requests and retrieve the list.</div>
</div>
<%= _.template($('#back').html())({action: "executeandadd", visible: true})%>
<script type="text/javascript">
    $(document).ready(function () {
        let lztOkButton = document.getElementById('ok')
        lztOkButton.style.backgroundColor = '#2BAD72'
        lztOkButton.style.borderColor = '#009a63'
        let lztBackButton = document.getElementById('backtomain')
        lztBackButton.style.backgroundColor = '#884444'
        lztBackButton.style.borderColor = '#884535'
    });
</script>