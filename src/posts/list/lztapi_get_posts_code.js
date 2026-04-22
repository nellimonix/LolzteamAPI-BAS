_call_function(_LZTAPI.__Posts.list, {
  thread_id: (<%= thread_id %>),
  page_of_post_id: (<%= page_of_post_id %>),
  page: (<%= page %>),
  limit: (<%= limit %>),
  order: (<%= order %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()