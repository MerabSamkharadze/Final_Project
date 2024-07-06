"use strict";
import { debounce, onInput, getData } from "./utils.js";

const input = document.querySelector("#search_movie");
input.addEventListener("input", debounce(onInput, 500));

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  input.value = "";
  onInput(input.value);
});

document.addEventListener("click", function (e) {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
const movie_colection = document.querySelector(".movie_colection");
const movie_colections = await getData("Spider-man");
const fragment = new DocumentFragment();
movie_colections.forEach((element) => {
  console.log(element);
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  const img = document.createElement("img");
  img.src = element.Poster;
  const title = document.createElement("h1");
  title.textContent = element.Title;
  movieDiv.appendChild(img);
  movieDiv.appendChild(title);
  fragment.appendChild(movieDiv);
});
movie_colection.appendChild(fragment);
