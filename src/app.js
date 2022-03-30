function displayInfomation(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#current-temp");
  let windElement = document.querySelector("#wind");
  let humidElement = document.querySelector("#humid");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let apiKey = "58852fb69388463e1271f80d4fc7e8f6";
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

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

  axios.get(apiUrlForecast).then(displayForecast);
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
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2" id="forecast">
        <h4 id="weekday">${formatForecastDay(forecastDay.dt)}</h4>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"  alt="weather icon" id="icon" />
        <div><span id="forecast-high">${Math.round(
          forecastDay.temp.max
        )}°C</span>/<span id="forecast-low">${Math.round(
          forecastDay.temp.min
        )}°C</span>
        </div>
      </div>
    `;
    }
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
