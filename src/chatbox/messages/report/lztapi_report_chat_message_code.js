_call_function(_LZTAPI.__Chatbox.__Chatbox_messages.report, {
  message_id:  (<%= message_id %>),
  reason:  (<%= reason %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()