_call_function(_LZTAPI.__Users.search, {
  username:  (<%= username %>),
  user_email:  (<%= user_email %>),
  custom_fields:  (<%= custom_fields %>),
  location:  (<%= location %>),
  occupation:  (<%= occupation %>),
  homepage:  (<%= homepage %>),
  interests:  (<%= interests %>),
  lztInnovationLink:  (<%= lztInnovationLink %>),
  lztInnovation20Link:  (<%= lztInnovation20Link %>),
  lztInnovation30Link:  (<%= lztInnovation30Link %>),
  scamURL:  (<%= scamURL %>),
  maecenasValue:  (<%= maecenasValue %>),
  telegram:  (<%= telegram %>),
  vk:  (<%= vk %>),
  steam:  (<%= steam %>),
  jabber:  (<%= jabber %>),
  lztDeposit:  (<%= lztDeposit %>),
  ban_reason:  (<%= ban_reason %>),
  timeout:  (<%= timeout %>) * 1000,
  interval: (<%= interval %>) * 1000,
  maxTime: (<%= maxTime %>) * 1000
})!
<%= variable %> = _result_function()