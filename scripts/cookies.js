"use strict";

const cookies_btn = document.getElementById("cookies_btn");
const cookies = document.getElementById("cookies");

cookies_btn.addEventListener("click", () => {
  cookies.style.display = "none";
  setCookie("cookie", true, 30);
});

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setDate(date.getDate() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires" + date.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + " path=/";
}

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let value;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) value = val.substring(name.length);
  });
  return value;
}

function cookieMsg() {
  if (!getCookie("cookie")) cookies.style.display = "block";
}

window.addEventListener("load", cookieMsg);
