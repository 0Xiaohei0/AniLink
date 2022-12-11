import "./DetailPage.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  var { imageUrl, name, type, description, episodes } = location.state;
  const watchedArray = new Array(episodes).fill(false);

  const [editURL, setEditURL] = useState(false);
  const [URL, setURL] = useState("");
  function handleSetURL() {
    setEditURL(true);
  }
  function handleConfirmURL() {
    setEditURL(false);
  }
  function handleURLInput(event) {
    setURL(event.target.value);
  }
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
      <div>
        {URL === "" ? (
          <p>URL: Not Set</p>
        ) : (
          <p>
            URL:
            <a href={URL} target="_blank" rel="noreferrer">
              {URL}
            </a>
          </p>
        )}
        <button className="URLSet EpisodeButton" onClick={handleSetURL}>
          Set URL
        </button>
      </div>
      {editURL ? (
        <div className="URLSetter">
          <input className="URLInput" type="text" onChange={handleURLInput} />
          <button
            className="URLConfirm EpisodeButton"
            onClick={handleConfirmURL}
          >
            Confirm
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DetailPage;
