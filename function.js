// 1 task
let now = new Date();
let currentTime = document.querySelector(".time");

let hour = now.getHours();
let minute = now.getMinutes();
currentTime.innerHTML = `${hour}:${minute} <small>PM</small>`;

// 2 task
let nowTwo = new Date();
let currentData = document.querySelector(".data");

let currentDayOfWeek = [
  "Sanday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = currentDayOfWeek[nowTwo.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[nowTwo.getMonth()];
let currentNumber = nowTwo.getDate();
currentData.innerHTML = `${day}, ${currentNumber} ${currentMonth} `;
