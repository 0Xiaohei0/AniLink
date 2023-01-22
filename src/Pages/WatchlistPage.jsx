import React from "react";
import CoverImageCard from "../Components/CoverImageCard";
import { getWatchlist } from "../Data/Watchlist";

function WatchlistPage() {
  return (
    <div className="Watchlist-Container">
      <h1>Watchlist:</h1>
      <div className="CoverCardList--container">
        {getWatchlist().map((Anime) => {
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
    </div>
  );
}

export default WatchlistPage;
