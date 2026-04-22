_call_function(_LZTAPI.__Threads.list, {
  forum_id: (<%= forum_id %>),
  creator_user_id: (<%= creator_user_id %>),
  sticky1: (<%= sticky1 %>),
  sticky0: (<%= sticky0 %>),
  thread_prefix_id: (<%= thread_prefix_id %>),
  thread_tag_id: (<%= thread_tag_id %>),
  page: (<%= page %>),
  limit: (<%= limit %>),
  order: (<%= order %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()