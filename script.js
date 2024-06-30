"use strict";

const getData = async () => {
  try {
    const data = await axios.get(
      "http://www.omdbapi.com/?i=tt3896198&apikey=2386a7bd"
    );
    console.log(data);
  } catch (err) {
    const h1 = document.createElement("h1");
    h1.textContent = ` Server error : ${err}`;
    document.body.appendChild(h1);
  }
};

getData();
