_call_function(_LZTAPI.__Forums.follow, {
  forumId: (<%= forumId %>),
  post: (<%= post %>),
  alert: (<%= alert %>),
  email: (<%= email %>),
  prefix_ids: (<%= prefix_ids %>),
  minimal_contest_amount: (<%= minimal_contest_amount %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()