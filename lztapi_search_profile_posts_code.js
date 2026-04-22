_call_function(_LZTAPI.__Search.profile_posts, {
  q: (<%= q %>),
  user_id: (<%= user_id %>),
  page: (<%= page %>),
  limit: (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()