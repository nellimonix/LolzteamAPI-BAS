_call_function(_LZTAPI.__Threads.move, {
  threadId:  (<%= threadId %>),
  node_id:  (<%= node_id %>),
  title:  (<%= title %>),
  title_en:  (<%= title_en %>),
  prefix_ids:  (<%= prefix_ids %>),
  apply_thread_prefix:  (<%= apply_thread_prefix %>),
  send_alert:  (<%= send_alert %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()