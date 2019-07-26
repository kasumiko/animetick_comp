function getAnime(document){
  document.find('div.progress').remove();
  return document.find('div.user_anime').get().map(user_anime => {
    return $(user_anime).find("li.animation").get().map(anime => {
      return $(anime).html();
    });
  });
}