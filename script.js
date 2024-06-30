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
    console.log(response.data);
  } catch (err) {
    const h1 = document.createElement("h1");
    h1.textContent = ` Server error : ${err}`;
    document.body.appendChild(h1);
  }
};

getData();

const debounce = (func) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, 1000);
  };
};

const onInput = (event) => {
  getData(event.target.value);
};
search_movie_input.addEventListener("input", debounce(onInput));
