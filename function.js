let nowTwo = new Date();
let currentData = document.querySelector(".data");

let currentDayOfWeek = [
  "Sunday",
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
