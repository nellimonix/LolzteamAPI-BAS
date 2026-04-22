_call_function(_LZTAPI.__Users.__Background.crop, {
  userId:  (<%= userId %>),
  x:  (<%= x %>),
  y:  (<%= y %>),
  crop:  (<%= crop %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()