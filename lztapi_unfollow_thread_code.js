_call_function(_LZTAPI.__Threads.unfollow, {
  threadId:  (<%= threadId %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()