_call_function(_LZTAPI.__Chatbox.reportReasons, {
  message_id:  (<%= message_id %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()