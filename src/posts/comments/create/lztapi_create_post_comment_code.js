_call_function(_LZTAPI.__Posts.__Posts_comments.create, {
  post_id:  (<%= post_id %>),
  comment_body:  (<%= comment_body %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()