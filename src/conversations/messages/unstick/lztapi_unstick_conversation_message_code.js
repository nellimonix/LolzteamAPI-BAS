_call_function(_LZTAPI.__Conversations.__Conversations_messages.unstick, {
  conversationId:  (<%= conversationId %>),
  messageId:  (<%= messageId %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()