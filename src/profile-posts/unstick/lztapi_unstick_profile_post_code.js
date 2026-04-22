_call_function(_LZTAPI.__Profile_posts.unstick, {
  profilePostId:  (<%= profilePostId %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()