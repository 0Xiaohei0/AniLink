import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CoverImageCard({
  id,
  imageUrl,
  name,
  type,
  description,
  episodes,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
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
          <button className="coverCard--addButton">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="coverCard--finishedButton">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
