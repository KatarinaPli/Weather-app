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

//Time of a city location with calculates numbers
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}
// formating forecasts days from numbers to a mon, tue...
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  return days[day];
}
//doing a row for forecast line and we call a function to do it in ja not in html

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="45"
          />
          <div class="weather-forecast-temp">
            <span class="max-temp">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
        </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// call the forecast by lon and lat coordin
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "4b3503b2f08a729413c4d33ef1186004";

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

// call the main temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector(".city");
  let weatherConditionsElement = document.querySelector(".weather-conditions");
  let humidityElement = document.querySelector(".show-humidity");
  let windElement = document.querySelector(".show-wind");
  let timeElement = document.querySelector(".time");
  let iconElement = document.querySelector(".maneicon");

  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherConditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
// city
function search(city) {
  // api connection

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

//function for city
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-string");
  search(cityInputElement.value);
}
//Farenheit convertion
function displayFarenheitTemperature(event) {
  event.preventDefault();
  // remove an active class from celcius link
  celciusLink.classList.remove("activ");
  // add this active class to a faremheit link
  farenheitLink.classList.add("activ");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
// Celcius convertion
function displayCelciusTemperature(event) {
  event.preventDefault();
  // add an active class from celcius link
  celciusLink.classList.add("activ");
  // remove this active class to a faremheit link
  farenheitLink.classList.remove("activ");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
//global varior that is not in function
let celciusTemperature = null;

// search form
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//farinheit
let farenheitLink = document.querySelector("#fahrenheit-conversion");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

// celcius
let celciusLink = document.querySelector("#celcius-conversion");
celciusLink.addEventListener("click", displayCelciusTemperature);
// show the first city by default
search("Tokyo");
