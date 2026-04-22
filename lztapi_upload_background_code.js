_call_function(_LZTAPI.__Users.__Background.upload, {
  userId:  (<%= userId %>),
  x:  (<%= x %>),
  y:  (<%= y %>),
  crop:  (<%= crop %>),
  background:  (<%= background %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()