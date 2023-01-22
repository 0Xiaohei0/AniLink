import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { pushWatchlist, getAnime } from "../Data/Watchlist";

export default function CoverImageCard({
  id,
  imageUrl,
  name,
  type,
  description,
  episodes,
  addEnabled = true,
  finishEnabled = true,
  removeEnabled = false,
  progress = 0,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleAdd = () => {
    pushWatchlist(
      JSON.stringify({
        id: id,
        imageUrl: imageUrl,
        name: name,
        type: type,
        description: description,
        episodes: episodes,
        progressArray: new Array(episodes).fill(false),
      })
    );
  };

  const getProgressPercent = () => {
    if (episodes === 0) {
      return 0;
    }
    return (progress / (episodes ? episodes : 1)) * 100;
  };

  let anime = getAnime(id);
  if (anime != null && anime.progress != null) {
    progress = anime.progress;
  }

  return (
    <div
      className="coverCard--container"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link
        to={"/detail/" + id}
        state={{
          id,
          imageUrl,
          name,
          type,
          description,
          episodes,
        }}
        className="coverCard--link"
      >
        <img alt="coverImage" className="coverCard--image" src={imageUrl} />
        <div className="coverCard--infoContainer">
          <p className="coverCard--name">{name}</p>
          <div
            className="coverCard--progressBar"
            style={{
              width:
                getProgressPercent() === 0 ? "4%" : getProgressPercent() + "%",
              backgroundColor:
                getProgressPercent() === 0
                  ? "rgb(112, 166, 255)"
                  : getProgressPercent() < 100
                  ? "rgb(255, 167, 79)"
                  : "rgb(99, 245, 66)",
            }}
          ></div>
          <p className="coverCard--progress">
            {progress + "/" + (episodes ? episodes : 1)}
          </p>
        </div>
      </Link>
      {isHovering ? (
        <div>
          {addEnabled ? (
            <button className="coverCard--addButton" onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            ""
          )}
          {removeEnabled ? (
            <button className="coverCard--addButton" onClick={handleAdd}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
          {finishEnabled ? (
            <button className="coverCard--finishedButton">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
