"use strict";

const getData = async () => {
  try {
    const data = await axios.get("https://reqres.in/api/users?");
    console.log(data.data.data);
  } catch (err) {
    const h1 = document.createElement("h1");
    h1.textContent = ` Server error : ${err}`;
    document.body.appendChild(h1);
  }
};

getData();
