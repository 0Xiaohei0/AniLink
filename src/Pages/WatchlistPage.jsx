import React from "react";
import "./WatchlistPage.css";
import { useState, useEffect } from "react";

function WatchlistPage() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);
  return <div className="Watchlist-Container">WatchlistPage</div>;
}

export default WatchlistPage;
