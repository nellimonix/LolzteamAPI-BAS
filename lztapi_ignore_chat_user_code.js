_call_function(_LZTAPI.__Chatbox.ignore, {
  user_id: (<%= user_id %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()