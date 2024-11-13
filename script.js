// Weather API section

// const weatherForm = document.getElementById("weather-form");
// const cityElement = document.getElementById("city");
// const card = document.querySelector(".card");
// const apiKey = "bf274e853c8168a3dbc68ddce8b41d5d";

document
  .getElementById("weather-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    saveLocalStorage();

    // async function getWeatherData(city) {
    //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    //   const response = await fetch(apiUrl);

    //   if (!response.ok) {
    //     throw new Error("Could not fetch weather data");
    //   }

    //   return await response.json();
    // }

    // Form Field Variables
    const firstNameElement = document.getElementById("first-name");
    const cityElement = document.getElementById("city");

    // Validate name
    if (firstNameElement.value.trim() !== "") {
      hideError("name-error"); // Hide error message if name is valid
    } else {
      showError("name-error"); // Show error message if name is empty
    }

    // Validate city
    if (cityElement.value.trim() !== "") {
      hideError("city-error"); // Hide error message if city is valid
    } else {
      showError("city-error"); // Show error message if city is empty
    }
  });

// function displayWeatherInfo(data) {}

// Show error message
function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block"; // Make error message visible
}

// Hide error message
function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none"; // Hide error message
}

// Local Storage
function saveLocalStorage() {
  const firstNameElement = document.getElementById("first-name").value;
  const cityElement = document.getElementById("city").value;

  console.log("first-name", firstNameElement);
  console.log("city", cityElement);

  localStorage.setItem("myNameData", firstNameElement);
  localStorage.setItem("myCityData", cityElement);
}

// Session Storage (User's data)

//Cookies (Temperature toggle buttons)
// function saveCookie() {
//   const firstNameElement = document.getElementById("first-name").value;
// }
