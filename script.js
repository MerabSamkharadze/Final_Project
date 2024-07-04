"use strict";
import { debounce, getData, onMovieSelect } from "./utils.js";

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
  input.value = "";
  onInput();
});

document.addEventListener("click", function (e) {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
