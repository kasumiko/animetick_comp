chrome.runtime.onMessage.addListener((receive, sender, sendResponse)=>{
  $.ajax({
    url: location.href,
    type: 'GET',
    async: true
  }).then((origin, textStatus, jqXHR)=>{
    if(receive.active == false){
      $('body').html(origin);
      sendResponse('cont to bg');
      return true;
    }
    const doc = $(origin);
    const res = execMethod(getAnime(doc), receive.anime, receive.method);
    embResults(res);
    $('div.user_info').html(concatUserInfo(getUserInfo(doc),receive.info));
    $('h2').remove();
    return;
  }).catch((jqXHR, textStatus, errorThrown)=>{
    console.log(jqXHR.status);
    console.error(errorThrown);
  })
  sendResponse('cont to bg');
  return true;
})

function execMethod(animes, animec, method){
  return animes.map((elem,i) => {
    switch (method) {
      case 'and':
        return andArray(elem,animec[i]);
      case 'xor':
        return xorArray(elem,animec[i]);
      case 'or':
        return orArray(elem,animec[i]);
      default:
        break;
    }
  });
}

function andArray(array1, array2) {
  return array1.filter(elem=>{
    return array2.includes(elem);
  });
}

function xorArray(array1, array2){
  const array = array1.concat(array2);
  return array.filter(elem => {
    return !(array1.includes(elem) && array2.includes(elem))
  })
}

function orArray(array1, array2){
  return [...(new Set(array1.concat(array2)))];
}

function concatUserInfo(html1, html2){
  return html1 + '<div class = "user_detail"><span class = "name"> VS </span></div>' + html2;
}
function embResults(result){
  result.forEach((elem, i) => {
    let html = elem.map((el, i)=>{
      const ret = '<li class = "animation">\n' + el + '\n</li>\n'; 
      if(i % 10 == 0){return '<ul class = "animations">\n' + ret}
      if(i % 10 == 9){return ret + '\n</ul>\n'}
      return ret;
    }).join('');
    if(!html.match(/<\/ul>\n$/)) html += '\n</ul>\n';
    $('div.user_anime').eq(i).html(html);
  });
}