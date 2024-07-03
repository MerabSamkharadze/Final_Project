"use strict";
import { debounce } from "./utils.js";

const search_movie_input = document.getElementById("search_movie");
const searched_movies_container = document.querySelector(
  ".searched_movies_container"
);
const getData = async (searchTerm) => {
  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2386a7bd",
        s: searchTerm,
      },
    });
    console.log(response.data.Search);
    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  } catch (err) {
    const h1 = document.createElement("h1");
    h1.textContent = ` Server error : ${err}`;
    document.body.appendChild(h1);
  }
};

const onInput = async (event) => {
  const movies = await getData(event.target.value);
  console.log(movies);
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <img class='poster' src="${movie.Poster}"/>
    <h1 class="movie_title">${movie.Title}</h1>
    `;
    searched_movies_container.appendChild(div);
  });
};
search_movie_input.addEventListener("input", debounce(onInput, 1000));
