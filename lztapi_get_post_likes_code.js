_call_function(_LZTAPI.__Posts.likes, {
  postId:  (<%= postId %>),
  page:  (<%= page %>),
  limit:  (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()