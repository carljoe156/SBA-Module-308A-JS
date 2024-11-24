// script.js handles all the importing

import { getWeatherData } from "./api.js"; // Imports the weather API function
import { updateWeatherUI } from "./ui.js"; // Imports the UI update function

const checkWeatherBtn = document.getElementById("checkWeatherBtn");
const citySearchInput = document.getElementById("citySearch");

const celsiusRadio = document.getElementById("inlineRadio1");
const fahrenheitRadio = document.getElementById("inlineRadio2");

let selectedUnit = "Celsius";

// An Event listener for the weather button
checkWeatherBtn.addEventListener("click", () => {
  const city = citySearchInput.value.trim(); // Your city can be added here!

  if (city) {
    getWeatherData(city)
      .then((data) => {
        updateWeatherUI(data, selectedUnit);
      })
      .catch((error) => {
        alert("Error fetching weather data. Please try again!."); // To Handle any errors occurred like your city was not found)
      });
  } else {
    alert("Please enter a city.");
  }
});

// An Event listener for when the user selects Celsius
celsiusRadio.addEventListener("change", () => {
  if (celsiusRadio.checked) {
    selectedUnit = "Celsius";
  }
});

// An Event listener for when the user selects Fahrenheit
fahrenheitRadio.addEventListener("change", () => {
  if (fahrenheitRadio.checked) {
    selectedUnit = "Fahrenheit";
  }
});

// // dark mode button - W.I.P
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
