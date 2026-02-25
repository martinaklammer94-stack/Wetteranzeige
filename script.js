// Declare API Key and URL (create your personal API Key on openweathermap.org)
const apiKey = CONFIG.API_KEY;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Retrieve elements from DOM (input field, button, weather-icon)
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Prevent default
document.addEventListener("DOMContentLoaded", () => {
  showError(false); // Hide error message when loading
  showWeather(false); // Hide weather when loading
  searchBox.value = ""; // Clear input field
});

// Mapping of the weather icons
const weatherIcons = {
  Clouds: "clouds.png",
  Clear: "clear.png",
  Drizzle: "drizzle.png",
  Mist: "mist.png",
  Snow: "snow.png",
  Rain: "rain.png",
};

// UI helper functions
function showError(show = true) {
  document.querySelector(".error").style.display = show ? "block" : "none";
  document.querySelector(".weather").style.display = "none";
}

function showWeather(show = true) {
  document.querySelector(".weather").style.display = show ? "block" : "none";
  document.querySelector(".error").style.display = "none";
}

// Retrieve relevant data from the open weather map
async function checkWeather(city) {
  // prevent empty input
  if (!city.trim()) {
    showError();
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // handle ANY HTTP error (not just 404)
    if (!response.ok) {
      showError();
      return;
    }

    let data = await response.json();

    // Display weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set weather icon using mapping
    const main = data.weather?.[0]?.main;
    weatherIcon.src = weatherIcons[main];

    showWeather();
  } catch (error) {
    // network errors, etc.
    showError();
  }
}

// On button click, call the function
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Allow Enter key to search
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkWeather(searchBox.value);
});
