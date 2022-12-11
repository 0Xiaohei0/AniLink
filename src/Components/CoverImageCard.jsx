import React from "react";
import { Link } from "react-router-dom";

export default function CoverImageCard({
  id,
  imageUrl,
  name,
  type,
  description,
  episodes,
}) {
  return (
    <Link
      to={"/detail/" + id}
      className="coverCard--container"
      state={{ id, imageUrl, name, type, description, episodes }}
    >
      <img alt="coverImage" className="coverCard--image" src={imageUrl} />
      <div className="coverCard--infoContainer">
        <p className="coverCard--name">{name}</p>
      </div>
    </Link>
  );
}
