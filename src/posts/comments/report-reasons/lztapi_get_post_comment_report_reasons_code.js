_call_function(_LZTAPI.__Posts.__Posts_comments.reportReasons, {
  post_comment_id:  (<%= post_comment_id %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()