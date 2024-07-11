"use strict";
import { debounce, onInput, getData, onMovieSelect } from "./utils.js";

const input = document.querySelector("#search_movie");
input.addEventListener("input", debounce(onInput, 500));

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// render films on home page
const moviesArray = [
  "avengers",
  "spider-man",
  "future",
  "love",
  "sea",
  "turtle",
  "pirates",
  "christmas",
  "father",
  "mom",
  "sister",
  "girl",
  "road",
  "forest",
  "friend",
  "ball",
  "trees",
  "science",
  "zombie",
];
let ind = Math.floor(Math.random() * moviesArray.length);
let movie = moviesArray[ind];
const movie_colection = document.querySelector(".movie_colection");
const movie_colections = await getData(movie);
const fragment = new DocumentFragment();
movie_colections.forEach((element) => {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  const img = document.createElement("img");
  img.src = element.Poster;
  const title = document.createElement("h1");
  title.textContent = element.Title;
  movieDiv.appendChild(img);
  movieDiv.appendChild(title);
  fragment.appendChild(movieDiv);

  //onMovieSelect
  movieDiv.addEventListener("click", function () {
    onMovieSelect(element);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
movie_colection.appendChild(fragment);

// movies you might like

const slider = document.querySelector(".slider");
