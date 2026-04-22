_call_function(_LZTAPI.__Forums.unfollow, {
  forumId: (<%= forumId %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()