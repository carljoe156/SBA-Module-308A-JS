const apiKey = "8af25c04a6d72e7bffa421475563f48c"; // For when you're ready
const citySearchInput = document.getElementById("citySearch");
const checkWeatherBtn = document.getElementById("checkWeatherBtn");

const cityNameElement = document.getElementById("cityName");
const tempElement = document.getElementById("temp");
const feelsLikeElement = document.getElementById("feelsLike");
const maxMinTempsElement = document.getElementById("maxMinTemps");
const weatherDescriptionElement = document.getElementById("weatherDescription");
const weatherIconElement = document.getElementById("weatherIcon");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("windSpeed");
const pressureElement = document.getElementById("pressure");
const darkModeButton = document.getElementById("darkModeBtn");

// Event listener for my button
checkWeatherBtn.addEventListener("click", () => {
  const city = citySearchInput.value.trim(); // Get city name from input
  if (city) {
    getWeather(city); // Fetch weather data if city is provided
  } else {
    alert("Please enter a city."); // Lets see the weather, Enter a City!
  }
});

// Fetch weather data from the OpenWeatherMap API
const getWeather = async (city) => {
  const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(weatherDataUrl);
    if (!res.ok) {
      throw new Error("Your City was not found."); // If city is not found you get an error!
    }

    const data = await res.json();

    // Get weather data
    const tempCelsius = data.main.temp;
    const feelsLikeCelsius = data.main.feels_like;
    const maxTempCelsius = data.main.temp_max;
    const minTempCelsius = data.main.temp_min;
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;

    // Function to convert Celsius to Fahrenheit
    function convertToFahrenheit(celsius) {
      return (celsius * 9) / 5 + 32;
    }

    // Function to update the display based on selected unit (Celsius or Fahrenheit)
    function updateTemperatureDisplay(unit = "Celsius") {
      let temp = tempCelsius;
      let feelsLike = feelsLikeCelsius;
      let maxTemp = maxTempCelsius;
      let minTemp = minTempCelsius;

      // Convert if Fahrenheit is selected
      if (unit === "Fahrenheit") {
        temp = convertToFahrenheit(tempCelsius);
        feelsLike = convertToFahrenheit(feelsLikeCelsius);
        maxTemp = convertToFahrenheit(maxTempCelsius);
        minTemp = convertToFahrenheit(minTempCelsius);
      }

      // Update the DOM elements with the converted data
      cityNameElement.textContent = city;
      tempElement.textContent = `Current temperature: ${temp.toFixed(2)}°${
        unit[0]
      }`;
      feelsLikeElement.textContent = `Feels Like: ${feelsLike.toFixed(2)}°${
        unit[0]
      }`;
      maxMinTempsElement.textContent = `Max: ${maxTemp.toFixed(2)}°${
        unit[0]
      }, Min: ${minTemp.toFixed(2)}°${unit[0]}`;
      weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
      weatherIconElement.src = iconURL;
      humidityElement.textContent = `Humidity: ${humidity}%`;
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
      pressureElement.textContent = `Pressure: ${pressure} hPa`;
    }

    // Initially update the display in Celsius
    updateTemperatureDisplay("Celsius");

    // Listen for changes in radio buttons (Celsius or Fahrenheit)
    document
      .getElementById("inlineRadio1")
      .addEventListener("change", function () {
        if (this.checked) {
          updateTemperatureDisplay("Celsius");
        }
      });

    document
      .getElementById("inlineRadio2")
      .addEventListener("change", function () {
        if (this.checked) {
          updateTemperatureDisplay("Fahrenheit");
        }
      });
  } catch (error) {
    console.error("Error:", error);
    alert("Error fetching weather data.");
  }
};

// // dark mode button
// darkModeButton.addEventListener("click", function () {
//   document.body.classList.toggle("dark-mode");
// });

// //Event listener for dark mode
// darkModeToggle.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");

//   if (localStorage.getItem("darkMode") === "enabled") {
//     body.classList.add("dark-mode");
//   }

//   // Save the user's preference in localStorage
//   if (body.classList.contains("dark-mode")) {
//     localStorage.setItem("darkMode", "enabled");
//   } else {
//     localStorage.removeItem("darkMode");
//   }
// });
