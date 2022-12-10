import React from "react";
import CoverImageCard from "./CoverImageCard";
import { useState, useEffect } from "react";

export default function Posters() {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    // Make the HTTP Api request
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
  }, []);

  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  var query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String ) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
        coverImage {
          extraLarge
        }
        title {
          romaji
        }
      }
    }
  }
`;

  // Define our query variables and values that will be used in the query request
  var variables = {
    search: "k-on",
    perPage: 10,
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
    console.log(data);
    setMediaArray(data.data.Page.media);
    console.log(mediaArray);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  //return <div>Posters</div>;
  return (
    <section id="Posters">
      <h1 className="Posters--title">CoverImages</h1>
      <div className="Posters--container">
        {mediaArray.map((Anime) => {
          return (
            <CoverImageCard
              key={Anime.id}
              imageUrl={Anime.coverImage.extraLarge}
              name={Anime.title.romaji}
            />
          );
        })}
      </div>
    </section>
  );
}
