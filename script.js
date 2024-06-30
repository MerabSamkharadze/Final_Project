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
let timeOutId;
const onInput = (event) => {
  if (timeOutId) {
    clearTimeout(timeOutId);
  }
  timeOutId = setTimeout(() => {
    getData(event.target.value);
  }, 1000);
};
search_movie_input.addEventListener("input", onInput);
