function displayInfomation(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#current-temp");
  let windElement = document.querySelector("#wind");
  let humidElement = document.querySelector("#humid");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  humidElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempElement.innerHTML = Math.round(celciusTemp);
}

function search(city) {
  let cityName = city;

  let apiKey = "58852fb69388463e1271f80d4fc7e8f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayInfomation);
}

function cityButton(event) {
  event.preventDefault();

  let cityName = document.querySelector("#user-city-input");
  let cityHeading = document.querySelector("#city-name");

  cityHeading.innerHTML = cityName.value;
  search(cityName.value);
}

function changeToCelcius(event) {
  event.preventDefault();

  let changeCelcius = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");

  tempElement.innerHTML = Math.round(changeCelcius);
}

function changeToFahrenheit(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#current-temp");

  tempElement.innerHTML = Math.round(celciusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thurs"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <h3 id="weekday">${day}</h3>
        <h4>
          <img src=" " alt="weather icon" id="icon" />
        </h4>
        <span id="forecast-high">80°F</span>/<span id="forecast-low">65°F</span>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemp = null;
let fahrenheitTemp = null;

let form = document.querySelector("#city-input");
form.addEventListener("submit", cityButton);

let fahrenheitChange = document.querySelector("#fahrenheit");
fahrenheitChange.addEventListener("click", changeToCelcius);

let celciusChange = document.querySelector("#celcius");
celciusChange.addEventListener("click", changeToFahrenheit);

search("Tampa");
displayForecast();
