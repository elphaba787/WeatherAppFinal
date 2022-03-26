function displayInfomation(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#current-temp");
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
}
let cityName = "Tampa";
let apiKey = "58852fb69388463e1271f80d4fc7e8f6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayInfomation);
