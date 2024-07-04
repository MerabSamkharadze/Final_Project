"use strict";

export const debounce = (func, delay) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// movie-Content

export const getData = async (searchTerm) => {
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

const movie_section = document.getElementById("movie_section");
movie_section.innerHTML = "";

export const onMovieSelect = async (movie) => {
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
