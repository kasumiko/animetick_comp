chrome.storage.sync.get(['value'],data=>{
  value = data.value
  $('textarea[name="username"]').val(value.username);
  $('input[name="method"]').val([value.method]);
  $('input#activity').prop('checked', value.active);
});

$('input#activity').change(()=>{
  sendForm();
})

$('input[name="method"]').change(()=>{
  sendForm();
})

$('textarea').on("keydown", event=>{
  if(event.code=='Enter'){
    sendForm();
    return false;
  }
})

function sendForm(){
  const active = $('input#activity').prop('checked');
  const username = $('textarea[name="username"]').val();
  const method = $('input[name="method"]:checked').val();
  const send = {username: username, method: method, active: active};
  chrome.extension.sendMessage(send, ()=>{});
}