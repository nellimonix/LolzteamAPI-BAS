_call_function(_LZTAPI.__Posts.__Posts_comments.get, {
  postId:  (<%= postId %>),
  before:  (<%= before %>),
  before_comment:  (<%= before_comment %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()