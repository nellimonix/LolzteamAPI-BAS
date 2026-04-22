_call_function(_LZTAPI.__Search.tag, {
  tag: (<%= tag %>),
  tags: (<%= tags %>),
  page: (<%= page %>),
  limit: (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()