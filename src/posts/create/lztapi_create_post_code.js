_call_function(_LZTAPI.__Posts.create, {
  thread_id:  (<%= thread_id %>),
  quote_post_id:  (<%= quote_post_id %>),
  post_body:  (<%= post_body %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()