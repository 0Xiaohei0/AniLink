import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { pushWatchlist } from "../Data/Watchlist";

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
      })
    );
  };

  return (
    <div
      className="coverCard--container"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link
        to={"/detail/" + id}
        state={{ id, imageUrl, name, type, description, episodes }}
        className="coverCard--link"
      >
        <img alt="coverImage" className="coverCard--image" src={imageUrl} />
        <div className="coverCard--infoContainer">
          <p className="coverCard--name">{name}</p>
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
