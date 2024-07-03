"use strict";
import { debounce } from "./utils.js";

const getData = async (searchTerm) => {
  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2386a7bd",
        s: searchTerm,
      },
    });

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
// search
const root = document.querySelector(".autocomplete");
root.innerHTML = `
      <input
        type="text"
        id="search_movie"
        placeholder="Search Movie"
      />
      <div class="dropdown">
        <div class="dropdown-menu">
           <div class="dropdown-content results"></div>
       </div>
       </div>

`;
const input = document.querySelector("#search_movie");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  resultsWrapper.innerHTML = " ";

  const movies = await getData(event.target.value);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  dropdown.classList.add("is-active");
  movies.forEach((movie) => {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? " " : movie.Poster;
    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
  `;
    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });
    resultsWrapper.appendChild(option);
  });
};
input.addEventListener("input", debounce(onInput, 500));

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("click", function (e) {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});

// movie-Content
const movie_section = document.getElementById("movie_section");
movie_section.innerHTML = "";
const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "2386a7bd",
      i: movie.imdbID,
    },
  });

  const movie_root = `

<div class="container">
<div class="posterDiv">
  <img
    src=${response.data.Poster}
  />
</div>
<div class="contentDiv">
 
    <h2 class="content_movie_title">${response.data.Title}</h2>
    <h2 class="imdb">IMDB: <span>${response.data.imdbRating}</span></h2>

  <div class="">
    <p>გამოშვების წელი: <span>${response.data.Year}</span></p>
    <p>ქვეყანა: <span>${response.data.Country}</span></p>
    <p>ჟანრი: <span>${response.data.Genre}</span></p>
    <p>რეჟისორი: <span>${response.data.Director}</span></p>
    <p>როლებში: <span>${response.data.Actors}</span></p>
    <p>
      აღწერა:
      <span
        >${response.data.Plot} </span
      >
    </p>
  </div>
</div>
</div>`;
  movie_section.innerHTML = movie_root;
};
