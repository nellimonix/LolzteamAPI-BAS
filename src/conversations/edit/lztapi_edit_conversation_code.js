_call_function(_LZTAPI.__Conversations.edit, {
  conversation_id:  (<%= conversation_id %>),
  title:  (<%= title %>),
  open_invite:  (<%= open_invite %>),
  history_open:  (<%= history_open %>),
  allow_edit_messages:  (<%= allow_edit_messages %>),
  allow_sticky_messages:  (<%= allow_sticky_messages %>),
  allow_delete_own_messages:  (<%= allow_delete_own_messages %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()