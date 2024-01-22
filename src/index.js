function searchWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector(".form-search-input");
  let city = document.querySelector(".current-city");
  city.innerHTML = searchCity.value;

  function displayWeather(response) {
    let currentCity = city;
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

  let apiKey = "9b00a0b2o792ct546c043d35bf49a6e3";
  let displayCity = city.innerHTML;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${displayCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);
