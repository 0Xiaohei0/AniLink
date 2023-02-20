import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  pushWatchlist,
  getAnime,
  setProgressArray,
  deleteWatchlist,
  incrementProgressArray,
} from "../Data/Watchlist";
import { toast } from "react-toastify";

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
  linkEnabled = true,
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
    pushWatchlist({
      id: id,
      imageUrl: imageUrl,
      name: name,
      type: type,
      description: description,
      episodes: episodes,
      progressArray: new Array(episodes).fill(false),
      progress: progress,
      url: "https://www.crunchyroll.com/search?q=" + name.toString(),
    });
    toast.success(`${name} added to watchlist`);
  };

  const handleIncrement = () => {
    anime = getAnime(id);
    if (!anime) {
      pushWatchlist({
        id: id,
        imageUrl: imageUrl,
        name: name,
        type: type,
        description: description,
        episodes: episodes,
        progressArray: new Array(episodes).fill(true),
        progress: progress,
        url: "https://www.crunchyroll.com/search?q=" + name.toString(),
      });
    } else {
      incrementProgressArray(id);
    }
  };

  const handleCompelete = () => {
    anime = getAnime(id);
    console.log(anime);
    if (!anime) {
      pushWatchlist({
        id: id,
        imageUrl: imageUrl,
        name: name,
        type: type,
        description: description,
        episodes: episodes,
        progressArray: new Array(episodes).fill(true),
        progress: progress,
        url: "https://www.crunchyroll.com/search?q=" + name.toString(),
      });
    } else {
      setProgressArray(id, new Array(episodes).fill(true));
    }
    toast.success(`${name} marked compelete`);
  };

  const handleURL = () => {
    let Anime = getAnime(id);
    if (!Anime) return;
    let url = getAnime(id).url;
    url = url ? url : "https://www.crunchyroll.com/search?q=" + name.toString();
    console.log(url);
    window.location.href = url;
  };

  const handleDelete = () => {
    deleteWatchlist(id);
    toast.success(`${name} deleted from watchlist`);
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
        </div>
      </Link>
      <div className="coverCard--progressContainer">
        <p className="coverCard--progress">
          {progress + "/" + (episodes ? episodes : 1)}
        </p>
        <button
          className="coverCard--incrementProgress"
          onClick={handleIncrement}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
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
            <button className="coverCard--addButton" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
          {finishEnabled ? (
            <button
              onClick={handleCompelete}
              className="coverCard--finishedButton"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          ) : (
            ""
          )}
          {linkEnabled ? (
            <button onClick={handleURL} className="coverCard--linkButton">
              <FontAwesomeIcon icon={faLink} />
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
