_call_function(_LZTAPI.__Profile_posts.edit, {
  profilePostId:  (<%= profilePostId %>),
  post_body:  (<%= post_body %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()