_call_function(_LZTAPI.__Conversations.search, {
  q:  (<%= q %>),
  conversation_id:  (<%= conversation_id %>),
  search_recipients:  (<%= search_recipients %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()