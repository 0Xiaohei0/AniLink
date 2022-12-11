import React from "react";

export default function CoverImageCard(props) {
  return (
    <a href={"/"} className="coverCard--container">
      <img alt="coverImage" className="coverCard--image" src={props.imageUrl} />
      <div className="coverCard--infoContainer">
        <p className="coverCard--name">{props.name}</p>
      </div>
    </a>
  );
}
