_call_function(_LZTAPI.__Chatbox.__Chatbox_messages.edit, {
  message_id: (<%= message_id %>),
  message: (<%= message %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()