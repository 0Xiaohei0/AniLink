import React from "react";
import CoverImageCard from "../Components/CoverImageCard";
import { useState, useEffect } from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { getProgressArray } from "../Data/Watchlist";

function SearchPage() {
  const [search, setSearch] = useState("k-on");
  const [mediaArray, setMediaArray] = useState([]);
  const [searchResultOpened, setSearchResultOpened] = useState(false);
  const [userDropdownOpened, setUserDropdownOpened] = useState(false);
  // const [backendData, setBackendData] = useState([]);
  useEffect(() => {
    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible
    var query = `
    query ( $page: Int, $perPage: Int= 30, $search: String = "k-on", $isAdult: Boolean = false, $sort: [MediaSort] = POPULARITY_DESC, $type: MediaType = ANIME) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media ( search: $search, isAdult: $isAdult, sort: $sort, type: $type) {
          id
          type
          description
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          season
          seasonYear
          status
          episodes
          duration
          genres
          averageScore
          coverImage {
            extraLarge
          }
          title {
            romaji
            native
          }
        }
      }
    }
`;

    // Define our query variables and values that will be used in the query request
    var variables = {
      search: search,
      perPage: 10,
      isAdult: false,
    };

    // Define the config we'll need for our Api request
    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleData(data) {
      setMediaArray(data.data.Page.media);
    }

    function handleError(error) {
      alert("Error, check console");
      console.error(error);
    }
    // Make the HTTP Api request
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    // fetch("/api")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setBackendData(data);
    //     console.log(backendData);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  function handleSearchBarClick() {
    setSearchResultOpened(true);
  }

  return (
    <div>
      <div className="Navbar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="SearchBarIcon" />
        <input
          className="SearchBar"
          type="text"
          onChange={handleChange}
          onClick={handleSearchBarClick}
        />
        <button
          style={{ visibility: searchResultOpened ? "visible" : "hidden" }}
          onClick={() => setSearchResultOpened(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <button
          className="Nambar--MenuButton"
          onClick={() => setUserDropdownOpened(!userDropdownOpened)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div
          style={{ visibility: userDropdownOpened ? "visible" : "hidden" }}
          className="userDropDown"
        >
          <a href="/login">Login</a>
          <a href="/dataExport">Export Data</a>
        </div>
      </div>

      <section
        className={
          "CoverCardList--section " + (searchResultOpened ? "show" : "")
        }
      >
        <h3> Search result: {search}</h3>
        <div className="CoverCardList--container">
          {mediaArray.map((Anime) => {
            return (
              <CoverImageCard
                key={Anime.id}
                id={Anime.id}
                imageUrl={Anime.coverImage.extraLarge}
                name={Anime.title.romaji}
                type={Anime.type}
                description={Anime.description}
                episodes={Anime.episodes}
                progressArray={getProgressArray(Anime.id)}
                linkEnabled={false}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
