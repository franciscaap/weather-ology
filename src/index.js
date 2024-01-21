function displayDate() {
  let currentDate = document.querySelector("#current-time");
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}

displayDate();

function searchWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector(".form-search-input");
  let city = document.querySelector(".current-city");
  city.innerHTML = searchCity.value;

  function displayWeather(response) {
    console.log(response);
    let currentCity = response.data.city;
    let currentTemperature = Math.round(response.data.temperature.current);
    let currentCondition = response.data.condition.description;
    let currentHumidity = response.data.temperature.humidity;
    let currentWind = response.data.wind.speed;
    let currentCountry = response.data.country;
    let city = document.querySelector(".current-city");
    city.innerHTML = currentCity;
    let country = document.querySelector(".current-country");
    country.innerHTML = currentCountry;
    let temperature = document.querySelector("#current-temperature-value");
    temperature.innerHTML = currentTemperature;
    let condition = document.querySelector("#condition");
    condition.innerHTML = currentCondition;
    let humidity = document.querySelector("#humidity");
    humidity = currentHumidity;
    let wind = document.querySelector("#wind");
    wind = currentWind;
    let conditionSentence = document.querySelector("#temperature-details");
    conditionSentence.innerHTML = `Humidity ${humidity}%, Wind: ${wind}km/h`;
  }
  let apiKey = "9b00a0b2o792ct546c043d35bf49a6e3";
  let displayCity = city.innerHTML;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${displayCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);
