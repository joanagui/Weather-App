apiKey = "17e7458113b38b3d9ab8a6cbf84a6119";

let cityName = "Porto";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

function showDetails(response) {
  console.log(response);
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
}
axios.get(apiUrl).then(showDetails);
