_call_function(_LZTAPI.__Forums.list, {
  parent_category_id: (<%= parent_category_id %>),
  parent_forum_id: (<%= parent_forum_id %>),
  order: (<%= order %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()