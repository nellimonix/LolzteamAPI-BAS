_call_function(_LZTAPI.__Profile_posts.__Profile_posts_comments.list, {
  profile_post_id:  (<%= profile_post_id %>),
  comment_id:  (<%= comment_id %>),
  page_of_comment_id:  (<%= page_of_comment_id %>),
  before:  (<%= before %>),
  limit:  (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()