import React from "react";

export default function CoverImageCard(props) {
  return (
    <a href={"/"} className="projectCard--container">
      <img
        alt="coverImage"
        className="projectCard--image"
        src={props.imageUrl}
      />
      <div className="projectCard--infoContainer">
        <p className="projectCard--name">{props.name}</p>
        <p className="projectCard--description">{props.description}</p>
      </div>
    </a>
  );
}
