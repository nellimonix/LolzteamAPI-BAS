_call_function(_LZTAPI.__Chatbox.__Chatbox_messages.get, {
  room_id: (<%= room_id %>),
  before_message: (<%= before_message %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()