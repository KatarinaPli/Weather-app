//current data
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
// call the main temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}
// api connection
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let units = "metric";
let apiUrl = `${apiEndpoint}?q=Tokyo&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
