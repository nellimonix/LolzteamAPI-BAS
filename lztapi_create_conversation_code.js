_call_function(_LZTAPI.__Conversations.create, {
    recipient_id: (<%= recipient_id %>),
    recipients: (<%= recipients %>),
    is_group: (<%= is_group %>),
    title: (<%= title %>),
    open_invite: (<%= open_invite %>),
    conversation_locked: (<%= conversation_locked %>),
    allow_edit_messages: (<%= allow_edit_messages %>),
    message_body: (<%= message_body %>),
    timeout:  (<%= timeout %>) * 1000,
    interval: (<%= interval %>) * 1000,
    maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()