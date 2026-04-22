_call_function(_LZTAPI.__Users.ignoreEdit, {
  userId:  (<%= userId %>),
  ignore_conversations:  (<%= ignore_conversations %>),
  ignore_content:  (<%= ignore_content %>),
  restrict_view_profile:  (<%= restrict_view_profile %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()