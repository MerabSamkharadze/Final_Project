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
  "list",
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

// //splide
// let ind_slider = Math.floor(Math.random() * moviesArray.length);
// let movie_slider = moviesArray[ind_slider];
// const splide__list = document.querySelector(".splide__list");

// document.addEventListener("DOMContentLoaded", function () {
//   async function getlis() {
//     const movies_for_slider = await getData(movie_slider);
//     movies_for_slider.forEach((movie) => {
//       let li = document.createElement("li");
//       li.classList.add("splide__slide");
//       const splideInnerHTML = `

//                   <div class="img_box">
//                     <img
//                       src=${movie.Poster}
//                       alt="img"
//                     />
//                   </div>
//                   <h1>${movie.Title}</h1>

//       `;
//       li.innerHTML = splideInnerHTML;

//       splide__list.appendChild(li);
//     });
//   }
//   getlis();
// });
// var splide = new Splide(".splide", {
//   type: "fade",
//   rewind: true,
// });

// splide.mount();
