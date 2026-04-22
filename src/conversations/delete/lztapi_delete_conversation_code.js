_call_function(_LZTAPI.__Conversations.delete_, {
  conversation_id:  (<%= conversation_id %>),
  delete_type:  (<%= delete_type %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()