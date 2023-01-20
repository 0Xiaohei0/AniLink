export function getWatchlist() {
  return getWatchlistFromLocalStorage();
}

export function setWatchlist(watchListInput) {
  // localStorage.setItem("watchList", watchListInput);
}

export function pushWatchlist(animeToPush) {
  let storedWatchList = getWatchlistFromLocalStorage();
  storedWatchList.push(animeToPush);
  localStorage.setItem("watchList", JSON.stringify(storedWatchList));
}

function getWatchlistFromLocalStorage() {
  let storedWatchList = localStorage.getItem("watchList");
  if (!storedWatchList) {
    storedWatchList = [];
  } else {
    storedWatchList = JSON.parse(storedWatchList);
  }
  return storedWatchList;
}
