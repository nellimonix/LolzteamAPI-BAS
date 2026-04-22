_call_function(_LZTAPI.__Threads.recent, {
  days: (<%= days %>),
  limit: (<%= limit %>),
  forum_id: (<%= forum_id %>),
  data_limit: (<%= data_limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()