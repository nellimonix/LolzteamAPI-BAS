_call_function(_LZTAPI.__Users.likes, {
  userId:  (<%= userId %>),
  node_id:  (<%= node_id %>),
  like_type:  (<%= like_type %>),
  type:  (<%= type %>),
  page:  (<%= page %>),
  content_type:  (<%= content_type %>),
  search_user_id:  (<%= search_user_id %>),
  stats:  (<%= stats %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()