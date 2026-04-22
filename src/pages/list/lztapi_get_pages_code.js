_call_function(_LZTAPI.__Pages.list, {
  parent_page_id: (<%= parent_page_id %>),
  order: (<%= order %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()