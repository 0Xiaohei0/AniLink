import "./DetailPage.css";
import React from "react";
import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  var { imageUrl, name, type, description, episodes } = location.state;
  const watchedArray = new Array(episodes).fill(false);
  return (
    <div className="PageContainer">
      <div className="Banner">
        <img alt="coverImage" className="image" src={imageUrl} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>Type: {type}</p>
        </div>
      </div>
      <div className="EpisodeButtonContainer">
        {watchedArray.map((watchedBool, index) => (
          <button key={index} className="EpisodeButton">
            <p>{index}</p>
            <p>{watchedBool}</p>
          </button>
        ))}
      </div>
      <input className="EpisodeInput" type="number" />
      <p>URL: Not SET</p>
      <div className="URLSetter">
        <input className="URLInput" type="text" />
        <button className="URLSet EpisodeButton">Set URL</button>
      </div>
    </div>
  );
}

export default DetailPage;
