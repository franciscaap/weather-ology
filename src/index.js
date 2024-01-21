function displayDate() {
  let currentDate = document.querySelector("#current-time");
  console.log(currentDate.innerHTML);
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
  let city = document.querySelector("h1");
  city.innerHTML = searchCity.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);
