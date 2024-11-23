const apiKey = "8af25c04a6d72e7bffa421475563f48c"; //for when I'm ready

const citySearchInput = document.getElementById("citySearch"); //need
const checkWeatherBtn = document.getElementById("checkWeatherBtn"); //need
const cityNameElement = document.getElementById("cityName");
const tempElement = document.querySelector(".temp"); //need
const feelsLikeElement = document.querySelector(".feelsLike"); //need
const maxMinTempsElement = document.querySelector(".maxMinTemps"); //need
const weatherDescriptionElement = document.querySelector(".weatherDescription"); //need
const weatherIconElement = document.querySelector(".weatherIcon"); //need
// const humidity = document.getElementById("humidity");

//const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; //units=metrics optional

//event listener for my button
checkWeatherBtn.addEventListener("click", () => {
  const city = citySearchInput.value.trim(); // Get city name from input
  if (city) {
    getWeather(city); // Fetch weather data if city is provided
  } else {
    alert("Please enter a city."); // Lets see the weather, Enter a City!
  }
});

const getWeather = async (city) => {
  //const apiKey = "8af25c04a6d72e7bffa421475563f48c"; //for when I'm ready
  const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(weatherData); // Make the API request
    if (!res.ok) {
      throw new Error("Your City was not found."); // If city is not found you get an error!
    }

    const data = await res.json(); // Convert response to JSON

    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const maxTemp = data.main.temp_max;
    // const tempElement = data.main.temp;
    const minTemp = data.main.temp_min;
    const weatherDescription = data.weather[0].description; //I may not need the description tbh
    const iconCode = data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;
    //const humidity = data.main.humidity; // temporary

    //
    console.log(`Temperature: ${temp}°C`);
    console.log(`Feels Like: ${feelsLike}°C`);
    console.log(`Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C`);
    console.log(`Description: ${weatherDescription}`);

    cityNameElement.textContent = city; // Set city name
    tempElement.textContent = `Temperature: ${temp}°C`; // Set temperature
    feelsLikeElement.textContent = `Feels like: ${feelsLike}°C`; // Set "feels like"
    maxMinTempsElement.textContent = `Max: ${maxTemp}°C, Min: ${minTemp}°C`; // Set max and min temperatures
    weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`; // Set weather description
    weatherIconElement.src = iconURL; // Controls the  weather icon
  } catch (error) {
    console.error("Error:", error);
    alert("Error fetching weather data.");
  }
};
