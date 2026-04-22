_call_function(_LZTAPI.__Profile_posts.__Profile_posts_comments.create, {
  profilePostId:  (<%= profilePostId %>),
  comment_body:  (<%= comment_body %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()