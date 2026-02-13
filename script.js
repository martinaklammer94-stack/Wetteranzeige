// Declare API Key and URL (create your personal API Key on openweathermap.org)
const apiKey = "xxx";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Retrieve elements from DOM (input field, button, weather-icon)
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Retrieve relevant data from the open weather map
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  console.log(data);

  // Display weather data
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  // Dispaly matching weather icon
  if (data.weather[0].main == "Clouds") {
    // src = update source file, then retrieve images
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "snow.png";
  }
}

// On button click, call the function
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
