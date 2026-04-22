<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Recording of batch requests. The maximum number of jobs in a batch is 10.</div>
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