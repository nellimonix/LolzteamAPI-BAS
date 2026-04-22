_call_function(_LZTAPI.__Threads.create, {
  forum_id:  (<%= forum_id %>),
  post_body:  (<%= post_body %>),
  title:  (<%= title %>),
  title_en:  (<%= title_en %>),
  prefix_ids:  (<%= prefix_ids %>),
  tags:  (<%= tags %>),
  hide_contacts:  (<%= hide_contacts %>),
  allow_ask_hidden_content:  (<%= allow_ask_hidden_content %>),
  reply_group:  (<%= reply_group %>),
  comment_ignore_group:  (<%= comment_ignore_group %>),
  dont_alert_followers:  (<%= dont_alert_followers %>),
  watch_thread_state:  (<%= watch_thread_state %>),
  watch_thread:  (<%= watch_thread %>),
  watch_thread_email:  (<%= watch_thread_email %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()