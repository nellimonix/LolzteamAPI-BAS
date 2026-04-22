_call_function(_LZTAPI.__Search.thread, {
  q: (<%= q %>),
  tag: (<%= tag %>),
  forum_id: (<%= forum_id %>),
  user_id: (<%= user_id %>),
  page: (<%= page %>),
  limit: (<%= limit %>),
  data_limit: (<%= data_limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()