_call_function(_LZTAPI.__Profile_posts.__Profile_posts_comments.list, {
  profilePostId: (<%= profilePostId %>),
  before: (<%= before %>),
  limit: (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()