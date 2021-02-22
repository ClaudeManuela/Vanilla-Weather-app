function formatDate(timestamp) {
  let now = new Date(timestamp);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`; }

function displayForecast(response){

  let forecastElement= document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += 
     `
     <div class="col-2">
        <div class="days" style="width: 8rem;">
            <div>
                ${formatHours(forecast.dt * 1000)}
                <br />
                  <div class=forecast-temp>
                      <strong> ${Math.round(forecast.main.temp_max)}° | </strong> ${Math.round(forecast.main.temp_min)}°
                      <br />
                      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                    <div>
              </div>
          </div>
        </div>`;
  }
}


function search(city) {
  let apiKey = "53a928a54f9cfac5d9a2b1324d145d62";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#input-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  Celciustemperature = response.data.main.temp;

  document.querySelector("#description").innerHTML = ` ${response.data.weather[0].description}`
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`
  document.querySelector("#feels-like").innerHTML = `Feels like:  ${response.data.main.feels_like}°C`
  document.querySelector("#today-date").innerHTML = `Today: ${formatDate(response.data.dt * 1000)}`;
  document.querySelector("#icon").setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

}

function randomCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

function getTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  search(city);
}

function findLocation(position) {
  let apiKey = "53a928a54f9cfac5d9a2b1324d145d62";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let button = document.querySelector("#search-form");
button.addEventListener("submit", getTemp);

let currentbutton = document.querySelector("#current");
currentbutton.addEventListener("click", getPosition);

// for converting celcius to Fahrenheit and vice versa
let Celciustemperature = null;


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (Celciustemperature * 9)/5 +32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature) 
}

let fahrenheittemp= document.querySelector("#fahrenheit-temp");
fahrenheittemp.addEventListener("click", displayFahrenheitTemperature)

function displayCelciusTemperature (event) {
  event.preventDefault();
  let CelciusElement = document.querySelector("#temperature")
  CelciusElement.innerHTML = Math.round(Celciustemperature)
}

let celciustemp = document.querySelector("#celcius-temp");
celciustemp.addEventListener("click", displayCelciusTemperature)

search("Tokyo");