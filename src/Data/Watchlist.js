export function getWatchlist() {
  return getWatchlistFromLocalStorage();
}

export function getProgress(aniId) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let anime = storedWatchList.find((anime) => anime.id === aniId);
  return anime ? anime.progressArray : [];
}

export function setWatchlist(watchListInput) {
  // localStorage.setItem("watchList", watchListInput);
}

export function pushWatchlist(animeToPush) {
  let storedWatchList = getWatchlistFromLocalStorage();
  storedWatchList.push(animeToPush);
  localStorage.setItem("watchList", JSON.stringify(storedWatchList));
}

export function updateWatchlist(animeToUpdate, progressArray) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let animeToModify = storedWatchList.find(
    (anime) => anime.id === animeToUpdate
  );
  animeToModify.progressArray = progressArray;
  localStorage.setItem("watchList", JSON.stringify(storedWatchList));
}

function getWatchlistFromLocalStorage() {
  let storedWatchList = localStorage.getItem("watchList");
  if (!storedWatchList) {
    storedWatchList = [];
  } else {
    storedWatchList = JSON.parse(storedWatchList);
    for (let i = 0; i < storedWatchList.length; i++) {
      storedWatchList[i] = JSON.parse(storedWatchList.at(i));
    }
  }
  return storedWatchList;
}
