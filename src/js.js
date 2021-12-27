function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let forecastHMTL = `<div class="row week">`;
  let days = ["Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHMTL =
      forecastHMTL +
      `
          <div class="col">
            <div>${day}</div>
            <img
              src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
              alt="cloudy"
              id="icon2"
            />
          </div>`;

    forecastHTML = forecastHMTL + `</div>`;
    forecast.innerHTML = forecastHMTL;
  });
}
function getForecast(coordinates) {
  let apiKey = "17e7458113b38b3d9ab8a6cbf84a6119";
  let apiIcons = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  axios.get(apiIcons).then(displayForecast);
}

function showDetails(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let description = response.data.weather[0].description;
  let descriptionGeral = document.querySelector("#info");
  descriptionGeral.innerHTML = `${description}`;

  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#temp");
  tempValue.innerHTML = `${temperature}`;

  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${wind}km/h`;

  let humi = response.data.main.humidity;
  let humidity = document.querySelector("#humi");
  humidity.innerHTML = `Humidity: ${humi}%`;

  let dateElement = document.querySelector("#weekHour");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#textInput");
  let cityName = citySearch.value;
  apiKey = "17e7458113b38b3d9ab8a6cbf84a6119";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDetails);
}
let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

function tempFarh(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let farhValue = (temperature.innerHTML * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farhValue);
}

let farh = document.querySelector("#farhValue");
farh.addEventListener("click", tempFarh);
