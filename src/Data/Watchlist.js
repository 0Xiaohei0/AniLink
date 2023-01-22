export function getWatchlist() {
  return getWatchlistFromLocalStorage();
}
export function getAnime(aniId) {
  let storedWatchList = getWatchlistFromLocalStorage();
  return storedWatchList.find((anime) => anime.id === aniId);
}

export function getProgressArray(aniId) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let anime = storedWatchList.find((anime) => anime.id === aniId);
  return anime ? anime.progressArray : undefined;
}

export function setProgressArray(aniId, progressArray) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let anime = storedWatchList.find((anime) => anime.id === aniId);
  if (!anime) return;
  anime.progressArray = progressArray;
  let episodesWatchedCount = 0;
  for (let i = 0; i < progressArray.length; i++) {
    if (progressArray[i] !== false) {
      episodesWatchedCount++;
    }
  }
  anime.progress = episodesWatchedCount;
  setWatchlist(storedWatchList);
}

export function pushWatchlist(animeToPush) {
  let storedWatchList = getWatchlistFromLocalStorage();
  if (storedWatchList.find((anime) => anime.id === animeToPush.id)) {
    return false;
  }
  storedWatchList.push(JSON.stringify(animeToPush));
  setWatchlist(storedWatchList);
  return true;
}

export function updateWatchlist(animeToUpdate, progressArray) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let animeToModify = storedWatchList.find(
    (anime) => anime.id === animeToUpdate
  );
  animeToModify.progressArray = progressArray;
  setWatchlist(storedWatchList);
}

function getWatchlistFromLocalStorage() {
  let storedWatchList = localStorage.getItem("watchList");
  if (!storedWatchList) {
    storedWatchList = [];
  } else {
    storedWatchList = JSON.parse(storedWatchList);
    for (let i = 0; i < storedWatchList.length; i++) {
      try {
        storedWatchList[i] = JSON.parse(storedWatchList.at(i));
      } catch {}
    }
  }
  return storedWatchList;
}

function setWatchlist(watchListInput) {
  localStorage.setItem("watchList", JSON.stringify(watchListInput));
  window.dispatchEvent(new Event("storage"));
}
