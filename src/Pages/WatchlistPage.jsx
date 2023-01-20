import React from "react";
import "./WatchlistPage.css";
import CoverImageCard from "../Components/CoverImageCard";
import { getWatchlist } from "../Data/Watchlist";

function WatchlistPage() {
  return (
    <div className="Watchlist-Container">
      WatchlistPage
      <div className="CoverCardList--container">
        {getWatchlist().map((Anime) => {
          Anime = JSON.parse(Anime);
          return (
            <CoverImageCard
              key={Anime.id}
              id={Anime.id}
              imageUrl={Anime.imageUrl}
              name={Anime.name}
              type={Anime.type}
              description={Anime.description}
              episodes={Anime.episodes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WatchlistPage;
