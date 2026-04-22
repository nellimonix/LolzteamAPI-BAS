_call_function(_LZTAPI.__Profile_posts.report, {
  profilePostId:  (<%= profilePostId %>),
  message:  (<%= message %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()