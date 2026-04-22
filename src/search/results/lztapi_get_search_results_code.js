_call_function(_LZTAPI.__Search.results, {
  searchId:  (<%= searchId %>),
  page:  (<%= page %>),
  limit:  (<%= limit %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()