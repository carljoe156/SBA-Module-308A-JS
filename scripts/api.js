// For API integration
// weatherAPI/script.js

const apiKey = "8af25c04a6d72e7bffa421475563f48c"; // Probably gonna have to hide this in the future idk

// Function to fetch weather data from the  OpenWeather API
export const getWeatherData = async (city) => {
  const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(weatherDataUrl);
    if (!response.ok) {
      throw new Error("Your City not found!");
    }
    const data = await response.json();
    return data; // Returns the corresponding weather data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
