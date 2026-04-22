_call_function(_LZTAPI.__Threads.edit, {
  threadId:  (<%= threadId %>),
  title:  (<%= title %>),
  title_en:  (<%= title_en %>),
  prefix_id:  (<%= prefix_id %>),
  tags:  (<%= tags %>),
  discussion_open:  (<%= discussion_open %>),
  hide_contacts:  (<%= hide_contacts %>),
  allow_ask_hidden_content:  (<%= allow_ask_hidden_content %>),
  reply_group:  (<%= reply_group %>),
  comment_ignore_group:  (<%= comment_ignore_group %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()