_call_function(_LZTAPI.__Users.claims, {
  userId:  (<%= userId %>),
  type:  (<%= type %>),
  claim_state:  (<%= claim_state %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()