import React from "react";
import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  var { imageUrl, name, type, description, episodes } = location.state;
  const watchedArray = new Array(episodes).fill(false);
  return (
    <div>
      <img alt="coverImage" className="Details--image" src={imageUrl} />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Type: {type}</p>
      {watchedArray.map((watchedBool, index) => (
        <button key={index}>
          <p>{index}</p>
          <p>{watchedBool}</p>
        </button>
      ))}
      <p>URL: Not SET</p>
      <input type="text" />
    </div>
  );
}

export default DetailPage;
