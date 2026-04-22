_call_function(_LZTAPI.__Posts.delete_, {
  postId:  (<%= postId %>),
  reason:  (<%= reason %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()