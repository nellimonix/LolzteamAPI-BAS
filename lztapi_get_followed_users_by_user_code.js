_call_function(_LZTAPI.__Users.followings, {
  userId:  (<%= userId %>),
  order:  (<%= order %>),
  page:  (<%= page %>),
  limit:  (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()