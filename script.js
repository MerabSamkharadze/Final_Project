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

const movie_colections = await getData("avengers");
movie_colections.forEach((element) => {
  console.log(element);
});
