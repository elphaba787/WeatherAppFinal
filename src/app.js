function displayInfomation(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#current-temp");
  let windElement = document.querySelector("#wind");
  let rainElement = document.querySelector("#rain");
  let humidElement = document.querySelector("#humid");

  cityElement.innerHTML = response.data.name;
  humidElement.innerHTML = response.data.main.humidity;
  // rainElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
}

function cityButton(event) {
  event.preventDefault();

  let cityName = document.querySelector("#user-city-input");
  let cityHeading = document.querySelector("#city-name");

  cityHeading.innerHTML = cityName.value;
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", cityButton);

let cityName = "Tampa";
let apiKey = "58852fb69388463e1271f80d4fc7e8f6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayInfomation);
