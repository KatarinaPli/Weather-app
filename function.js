// 1 task Create a Current Fime
let now = new Date();
let currentTime = document.querySelector(".time");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentTime.innerHTML = `${hour}:${minute} <small>PM</small>`;

// 2 task Create a Current Data
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

//3 task reate a Current Temperature MAIN and CHANGE THE MAIN ICON DEPENDES ON TEMP
function showSearchTemp(response) {
  celciusTemperature = response.data.main.temp;
  let temperatureElement = Math.round(celciusTemperature);
  let temp = document.querySelector(".temperature");
  if (temperatureElement > 0) {
    temperatureElement = `+${temperatureElement}`;
  } else if (temperatureElement < 0) {
    temperatureElement = `-${temperatureElement}`;
  }
  temp.innerHTML = `${temperatureElement}`;

  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let speedWindElement = Math.round(response.data.wind.speed);
  let showWind = document.querySelector(".wind");
  showWind.innerHTML = `Wind: ${speedWindElement} km/h`;

  let showDescription = document.querySelector(".weather-conditions");
  showDescription.innerHTML = ` ${response.data.weather[0].description}`;
  let maneIcon = document.querySelector(".maneicon");

  maneIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search");
  let h1 = document.querySelector(".city");
  h1.innerHTML = city.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchTemp);
}
function displayFarenheiTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (5 * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}
let weather = document.querySelector(".search-button");
weather.addEventListener("click", changeCity);

let fahrenheitLink = document.querySelector(".fahrenheit-convertion");
fahrenheitLink.addEventListener("click", displayFarenheiTemperature);

// 4 task DESCRIPTION

function showDetails(response) {
  let h1 = document.querySelector(".city");
  h1.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let yourTemperature = document.querySelector(".temperature");
  yourTemperature.innerHTML = `${temperature}`;

  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let speedWindElement = Math.round(response.data.wind.speed);
  let showWind = document.querySelector(".wind");
  showWind.innerHTML = `Wind: ${speedWindElement} km/h`;

  let showDescription = document.querySelector(".weather-conditions");
  showDescription.innerHTML = ` ${response.data.weather[0].description}`;
}

// 5 task CURRENT WEATHER BASED ON  YOUR LAT I LON POSITION
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
}
function showData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let yourWeather = document.querySelector(".second-button");
yourWeather.addEventListener("click", showData);

// 6 task Fahrenheit Convertion
/*function showFarenheiTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitConvertion = document.querySelector(".fahrenheit-convertion");
fahrenheitConvertion.addEventListener("click", showFarenheiTemperature);
*/
//${temperatureElement}
