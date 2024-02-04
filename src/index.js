function searchWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector(".form-search-input");
  let city = document.querySelector(".current-city");
  city.innerHTML = searchCity.value;

  search(searchCity.value);
}

function displayWeather(response) {
  let currentCity = document.querySelector(".current-city");

  let temperature = document.querySelector("#current-temperature-value");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let country = document.querySelector("#country");
  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  currentCity.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  country.innerHTML = response.data.country;
  time.innerHTML = displayDate(date);
  icon.innerHTML = `
    <img
      src= "${response.data.condition.icon_url}" class="current-temperature-icon"
    />`;

  getForecast(response.data.city);
}
function displayDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "9b00a0b2o792ct546c043d35bf49a6e3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-date">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <img
              src="${day.condition.icon_url}"
              class="weather-forecast-icon"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperatures-max">${Math.round(
                day.temperature.maximum
              )}° </span>
              <span class="weather-forecast-temperatures-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`;
    }
  });

  let forecast = document.querySelector(".weather-forecast");
  forecast.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "9b00a0b2o792ct546c043d35bf49a6e3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);

search("London");
