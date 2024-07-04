"use strict";
import { debounce, onInput } from "./utils.js";

const input = document.querySelector("#search_movie");
input.addEventListener("input", debounce(onInput, 500));

// const logo = document.getElementById("logo");
// logo.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
//   input.value = "";
//   onInput(input.value);
// });

document.addEventListener("click", function (e) {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
