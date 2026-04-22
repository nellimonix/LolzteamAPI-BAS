_call_function(_LZTAPI.__Threads.vote, {
  threadId:  (<%= threadId %>),
  response_id:  (<%= response_id %>),
  response_ids:  (<%= response_ids %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()