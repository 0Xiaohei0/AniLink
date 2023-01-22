import React, { useState } from "react";
import { useEffect } from "react";
import CoverImageCard from "../Components/CoverImageCard";
import { getWatchlist } from "../Data/Watchlist";

function WatchlistPage() {
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState(() => noFilter);
  window.addEventListener("storage", () => {
    //console.log("Change to local storage!");
    setRefresh(!refresh);
  });
  useEffect(() => {}, [refresh, filter]);

  function finishedFilter(anime) {
    return anime.progress === anime.episodes;
  }
  function watchingFilter(anime) {
    return anime.progress < anime.episodes && anime.progress > 0;
  }
  function notStartedFilter(anime) {
    return anime.progress === 0;
  }
  function noFilter(anime) {
    return true;
  }
  return (
    <div className="Watchlist-Container">
      <div className="Watchlist-Header">
        <h1>Watchlist</h1>
        <span className="Watchlist-Filter-Container">
          <button
            onClick={() =>
              setFilter(() => {
                return filter.toString() === notStartedFilter.toString()
                  ? noFilter
                  : notStartedFilter;
              })
            }
            className={
              "Watchlist-Filter-left" +
              (filter.toString() === notStartedFilter.toString()
                ? " Filter-Active"
                : "")
            }
          >
            Not Started
          </button>
          <button
            onClick={() =>
              setFilter(() => {
                return filter.toString() === watchingFilter.toString()
                  ? noFilter
                  : watchingFilter;
              })
            }
            className={
              "Watchlist-Filter-middle" +
              (filter.toString() === watchingFilter.toString()
                ? " Filter-Active"
                : "")
            }
          >
            Watching
          </button>
          <button
            onClick={() =>
              setFilter(() => {
                return filter.toString() === finishedFilter.toString()
                  ? noFilter
                  : finishedFilter;
              })
            }
            className={
              "Watchlist-Filter-right" +
              (filter.toString() === finishedFilter.toString()
                ? " Filter-Active"
                : "")
            }
          >
            Finished
          </button>
        </span>
      </div>
      {getWatchlist().filter(filter).length === 0 ? (
        <div>No Anime found with the given filter</div>
      ) : (
        <div className="CoverCardList--container">
          {getWatchlist()
            .filter(filter)
            .map((Anime) => {
              return (
                <CoverImageCard
                  key={Anime.id}
                  id={Anime.id}
                  imageUrl={Anime.imageUrl}
                  name={Anime.name}
                  type={Anime.type}
                  description={Anime.description}
                  episodes={Anime.episodes}
                  addEnabled={false}
                  removeEnabled={true}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
