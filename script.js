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
  if (event.target.value.length > 2) {
    dropdown.classList.add("is-active");
  } else {
    if (dropdown.getAttribute("class").includes("is-active")) {
      dropdown.classList.remove("is-active");
    }
  }
  movies.forEach((movie) => {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? " " : movie.Poster;
    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
  `;
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
