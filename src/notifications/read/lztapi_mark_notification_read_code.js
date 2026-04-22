_call_function(_LZTAPI.__Notifications.read, {
  notification_id:  (<%= notification_id %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()