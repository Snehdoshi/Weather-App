const ApiKey = "a8c86d097fccb3be701bbadffcd9d4b9";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

let currentUnit = "metric"; 
let currentCity = "";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const unitSwitch = document.getElementById("unitSwitch");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  currentCity = city; 
  const response = await fetch(`${ApiUrl}${city}&units=${currentUnit}&appid=${ApiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    const tempUnit = currentUnit === "metric" ? "°C" : "°F";
    const windUnit = currentUnit === "metric" ? "km/h" : "mph";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + tempUnit;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " " + windUnit;

    const mainWeather = data.weather[0].main;

    if (mainWeather === "Clouds") {
      weatherIcon.src = "/images/clouds.png";
    } else if (mainWeather === "Clear") {
      weatherIcon.src = "/images/clear.png";
    } else if (mainWeather === "Rain") {
      weatherIcon.src = "/images/rain.png";
    } else if (mainWeather === "Mist") {
      weatherIcon.src = "/images/mist.png";
    } else if (mainWeather === "Drizzle") {
      weatherIcon.src = "/images/drizzle.png";
    } else if (mainWeather === "Snow") {
      weatherIcon.src = "/images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});


searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});


unitSwitch.addEventListener("change", () => {
  currentUnit = unitSwitch.checked ? "imperial" : "metric";
  if (currentCity) {
    checkWeather(currentCity); 
  }
});
