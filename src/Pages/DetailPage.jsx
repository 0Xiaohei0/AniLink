import "./DetailPage.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProgressArray, setProgressArray } from "../Data/Watchlist";

function DetailPage() {
  const location = useLocation();
  var { id, imageUrl, name, type, description, episodes } = location.state;
  const [watchedArray, setWatchedArray] = useState(
    getProgressArray(id)
      ? getProgressArray(id)
      : new Array(episodes).fill(false)
  );
  const [editURL, setEditURL] = useState(false);
  const [URL, setURL] = useState(
    "http://www.yinghuacd.com/search/" + name.toString() + "/"
  );

  useEffect(() => {
    setProgressArray(id, watchedArray);
  }, [watchedArray, id]);
  function handleSetURL() {
    setEditURL(true);
  }
  function handleConfirmURL() {
    setEditURL(false);
  }
  function handleURLInput(event) {
    setURL(event.target.value);
  }
  function handleEpisodeInput(event) {
    let episodeIndex = event.target.value - 1;
    if (episodeIndex <= episodes) {
      let watchedArraycpy = [...watchedArray];
      for (let i = 0; i < episodes; i++) {
        if (i <= episodeIndex) {
          watchedArraycpy[i] = true;
        } else {
          watchedArraycpy[i] = false;
        }
      }
      setWatchedArray(watchedArraycpy);
    }
  }
  function handleCompeleted() {
    let watchedArraycpy = [...watchedArray];
    for (let i = 0; i < episodes; i++) {
      watchedArraycpy[i] = true;
    }
    setWatchedArray(watchedArraycpy);
  }
  function getStatus() {
    let episodesWatchedCount = 0;
    for (let i = 0; i < episodes; i++) {
      if (watchedArray[i] !== false) {
        episodesWatchedCount++;
      }
    }
    if (episodesWatchedCount === 0) {
      return "Not Started";
    } else if (episodesWatchedCount === episodes) {
      return "Compeleted";
    } else {
      return "In progress";
    }
  }
  return (
    <div className="PageContainer">
      <div className="Banner">
        <img alt="coverImage" className="image" src={imageUrl} />
        <div>
          <h1>{name}</h1>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          <p>Type: {type}</p>
        </div>
      </div>
      <h2>Watch Progress: {getStatus()}</h2>
      <div className="EpisodeButtonContainer">
        {watchedArray.map((watchedBool, index) => (
          <button
            key={index}
            className={
              "EpisodeButton " + (watchedBool === true ? "watched" : "")
            }
            onClick={() => {
              let watchedArraycpy = [...watchedArray];
              watchedArraycpy[index] = !watchedArraycpy[index];
              setWatchedArray(watchedArraycpy);
            }}
          >
            <p>{index + 1}</p>
          </button>
        ))}
      </div>
      <div className="EpisodeInputContainer">
        <input
          className="EpisodeInput "
          type="number"
          max={episodes}
          onChange={handleEpisodeInput}
        />
        <button
          className="CompeletedButton EpisodeButton"
          onClick={handleCompeleted}
        >
          Compeleted
        </button>
      </div>

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
