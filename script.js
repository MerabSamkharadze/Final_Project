"use strict";

const getData = async () => {
  try {
    const data = await axios.get("https://reqres.in/api/users?");
    console.log(data.data.data);
  } catch (err) {
    console.log(err);
  }
};

getData();
