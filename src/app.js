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

function cityButton(event) {
  event.preventDefault();

  let cityName = document.querySelector("#user-city-input");
  let cityHeading = document.querySelector("#city-name");

  cityHeading.innerHTML = cityName.value;
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

let form = document.querySelector("#city-input");
form.addEventListener("submit", cityButton);

let fahrenheitChange = document.querySelector("#fahrenheit");
fahrenheitChange.addEventListener("click", changeToCelcius);

let celciusChange = document.querySelector("#celcius");
celciusChange.addEventListener("click", changeToFahrenheit);

let cityName = "Tampa";
let celciusTemp = null;
let fahrenheitTemp = null;
let apiKey = "58852fb69388463e1271f80d4fc7e8f6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayInfomation);
