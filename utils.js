function getAnime(document){
  document.find('div.progress').remove();
  return document.find('div.user_anime').get().map(user_anime => {
    return $(user_anime).find("li.animation").get().map(anime => {
      return $(anime).html();
    });
  });
}

function getUserInfo(doc){
  let raw = doc.find("div.user_info");
  raw.find('div.user_twitter').remove();
  console.log(raw);
  return raw.html();
}