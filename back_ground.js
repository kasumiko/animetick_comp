chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('animetick.net/users')) {
      if(changeInfo.status == 'complete'){
        chrome.storage.sync.get(['value'], data=>{
          sendCompData(data.value);
        });
      }
      chrome.pageAction.show(tabId);
    }
});

chrome.runtime.onMessage.addListener((receive, sender, sendResponse)=>{
  if(nameNull(receive.username)) receive.active = false;
  chrome.storage.sync.set({value: receive});
  sendCompData(receive);
  sendResponse('bg to page');
  return true;
})

function sendCompData (receive){
  chrome.tabs.getSelected(null, function(tab){
    if(!receive.active){
      sendToContent(tab.id, {active:false});
      return;
    }
    $.get(makeURL(tab, receive.username), (page, textStatus, jqXHR)=>{
      const doc = $(page);
      userInfo = getUserInfo(doc);
      if(userInfo == undefined){
        alert('Invalid user name!');
        return;
      } 
      const send = {
        anime: getAnime(doc), 
        method: receive.method, 
        info: userInfo, 
        active: receive.active
      };
      sendToContent(tab.id,send);
    })  
  })
}

function makeURL(tab, username){
  const baseURI = "http://animetick.net/users/";
  let search = tab.url.match(/\?.*/);
  if(search == null) search = '';
  return baseURI + username + search;
}

function nameNull(username){
  if(username == '') return true;
  return false;
}

function sendToContent(tabId, send){
  chrome.tabs.sendMessage(tabId, send, (response)=>{
    console.log(response);
  })
}
