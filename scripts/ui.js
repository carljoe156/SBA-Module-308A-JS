// for other function like DOM
// ui.js

// Function to convert Celsius to Fahrenheit
export const convertToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

// Function to update the weather data on the UI
export const updateWeatherUI = (data, unit = "Celsius") => {
  const cityNameElement = document.getElementById("cityName");
  const tempElement = document.getElementById("temp");
  const feelsLikeElement = document.getElementById("feelsLike");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("windSpeed");
  const pressureElement = document.getElementById("pressure");
  const weatherDescriptionElement =
    document.getElementById("weatherDescription");
  const weatherIconElement = document.getElementById("weatherIcon");
  const maxMinTempsElement = document.getElementById("maxMinTemps");

  let temp = data.main.temp;
  let feelsLike = data.main.feels_like;
  let maxTemp = data.main.temp_max;
  let minTemp = data.main.temp_min;

  // Convert to Fahrenheit if the user has selected it
  if (unit === "Fahrenheit") {
    temp = convertToFahrenheit(temp);
    feelsLike = convertToFahrenheit(feelsLike);
    maxTemp = convertToFahrenheit(maxTemp);
    minTemp = convertToFahrenheit(minTemp);
  }

  // Updates the UI with the weather data
  cityNameElement.textContent = `${data.name}, ${data.sys.country}`;
  tempElement.textContent = `Current temperature: ${temp.toFixed(2)}°${
    unit === "Celsius" ? "C" : "F"
  }`;
  feelsLikeElement.textContent = `Feels like: ${feelsLike.toFixed(2)}°${
    unit === "Celsius" ? "C" : "F"
  }`;
  humidityElement.textContent = `Humidity: ${data.main.humidity || "N/A"}%`;
  windSpeedElement.textContent = `Wind speed: ${data.wind.speed || "N/A"} m/s`;
  pressureElement.textContent = `Pressure: ${data.main.pressure || "N/A"} hPa`;
  weatherDescriptionElement.textContent = `Description: ${
    data.weather[0].description || "N/A"
  }`;
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  // Updates the Max and Min Temperatures
  maxMinTempsElement.textContent = `MaxTemp: ${maxTemp.toFixed(2)}°${
    unit[0]
  }, MinTemp: ${minTemp.toFixed(2)}°${unit[0]}`;
};
