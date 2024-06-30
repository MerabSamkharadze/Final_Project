"use strict";
const search_movie_input = document.getElementById("search_movie");
const getData = async (searchTerm) => {
  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2386a7bd",
        s: searchTerm,
      },
    });

    return response.data.Search;
  } catch (err) {
    const h1 = document.createElement("h1");
    h1.textContent = ` Server error : ${err}`;
    document.body.appendChild(h1);
  }
};

getData();

const onInput = async (event) => {
  const movies = await getData(event.target.value);
  console.log(movies);
};
search_movie_input.addEventListener("input", debounce(onInput, 1000));
