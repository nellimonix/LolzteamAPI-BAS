_call_function(_LZTAPI.__Conversations.__Conversations_messages.create, {
  conversationId:  (<%= conversationId %>),
  reply_message_id:  (<%= reply_message_id %>),
  message_body:  (<%= message_body %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()