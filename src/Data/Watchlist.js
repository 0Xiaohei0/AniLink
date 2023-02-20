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

export function incrementProgressArray(aniId) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let anime = storedWatchList.find((anime) => anime.id === aniId);
  if (!anime) return;
  for (let i = 0; i < anime.progressArray.length; i++) {
    if (anime.progressArray[i] === false) {
      anime.progressArray[i] = true;
      anime.progress++;
      break;
    }
  }
  setWatchlist(storedWatchList);
}

export function setAnimeUrl(aniId, url) {
  let storedWatchList = getWatchlistFromLocalStorage();
  let anime = storedWatchList.find((anime) => anime.id === aniId);
  if (!anime) return;
  anime.url = url;
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

export function deleteWatchlist(aniId) {
  let storedWatchList = getWatchlistFromLocalStorage();
  for (let i = 0; i < storedWatchList.length; i++) {
    if (storedWatchList.at(i).id === aniId) {
      storedWatchList.splice(i, 1);
    }
  }
  setWatchlist(storedWatchList);
  return true;
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

export function setWatchlist(watchListInput) {
  if (typeof watchListInput === "object")
    localStorage.setItem("watchList", JSON.stringify(watchListInput));
  else if (typeof watchListInput === "string")
    localStorage.setItem("watchList", watchListInput);
  else {
    localStorage.setItem("watchList", JSON.stringify([]));
  }
  window.dispatchEvent(new Event("storage"));
}
