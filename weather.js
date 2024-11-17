// Variables

const weatherForm = document.querySelector(".weatherForm"); // Using querySelector to target specific class since there are no IDs
const cityInput = document.querySelector(".cityInput");
const nameInput = document.querySelector(".nameInput");
const card = document.querySelector(".card");
const toggleButton = document.getElementById("temp-toggle");
const apiKey = "71fb92d443e2393b0235e8857901001f"; // Personal API key for Open Weather Map

// Default unit is set to Celsius or Fahrenheit
let unit = `metric`; // This is equaled to Celsius

// Event listener for temperaturetoggle button to switch between Celsius & Fahrenheit
toggleButton.addEventListener(`change`, function () {
  unit = toggleButton.checked ? `imperial` : `metric`;
  if (cityInput.value.trim()) {
    getWeatherData(cityInput.value.trim()); // This if statement will re-fetch the weather data if the toggle is switched
  }
});

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // This stops the "button" from submitting unless all required fields are met
  saveSessionStorage();
  saveCookie();
  const city = cityInput.value.trim();
  const name = nameInput.value.trim();

  if (name) {
    // This shows the personalized greeting alert if a name is entered
    showPersonalizedGreeting(name);
  }

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      console.log(`weatherData`, weatherData);

      // Save the full weather data to local storage for persistence
      saveLocalStorage(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError("Enter a City name");
  }

  // Validate name
  if (nameInput.value.trim() !== "") {
    hideError("name-error"); // Hide error message if name is valid
  } else {
    showError("name-error"); // Show error message if name is empty
  }
});

// Function (Showing the Personalized Gretting)
function showPersonalizedGreeting(name) {
  const alertElement = document.getElementById("personalized-alert");
  const userNameElement = document.getElementById("user-name");

  // Updates the name in the alert to whatever is typed in the field
  userNameElement.textContent = name;

  // Shows the alert message and also applies CSS Styles
  alertElement.style.display = "block";
}

// Functions (API):

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error(
      "Could not fetch weather Data, Please enter an existing City name"
    );
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  // Checking if the data is in the expected structure
  const city = data.name || "Unknown City"; // Fallback to "Unknown City" if no name is found such as an issue occuring with the API
  const temp = data.main ? data.main.temp : null; // If the data is missing or there is an issue with the API then it would assign it a "null"
  const humidity = data.main ? data.main.humidity : null;
  const description = // If it fetches the data but there is no decription then it would return "No description available"
    data.weather && data.weather[0]
      ? data.weather[0].description
      : "No description available";
  const id = data.weather && data.weather[0] ? data.weather[0].id : null;

  // Check if the data exists for weather properties
  if (
    temp === null ||
    humidity === null ||
    description === "No description available"
  ) {
    displayError("Weather data is incomplete. Please try again.");
    return;
  }

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h3"); //Creating H1 Element using Javascript
  const tempDisplay = document.createElement("p"); //Creating Paragraph Element using Javascript
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmojiDisplay = document.createElement("p");

  cityDisplay.textContent = city; // Showing what is on the card when typing in a city to get information on the weatehr
  tempDisplay.textContent = `${
    unit === `metric`
      ? (temp - 273.15).toFixed(1) // Converts Kelvin to Celsius by subtracting 273.15 (".toFixed" means rounding up to one decminal place)
      : (((temp - 273.15) * 9) / 5 + 32).toFixed(1) // Converts Kelvin to Fahrenheit by subtracting 273.15 but then also multiply by 9/5 + 32
  }°${unit === `metric` ? `C` : `F`}`;

  // Subtract 273.15 from the temp and then round it up to 1 decminal place using ".toFxed"
  humidityDisplay.textContent = `Humidity: ${humidity}%`; // "$" means placeholder, in this instance it's a place holder for "humidity"
  descDisplay.textContent = description;
  weatherEmojiDisplay.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay"); // Simply making CSS properties apply to the selected class
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmojiDisplay.classList.add("weatherEmoji");

  card.appendChild(cityDisplay); // Simply putting the "cityDisplay" box into the "card" box
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmojiDisplay);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 400 && weatherId < 500:
      return "⛈️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "💨";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "?";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// Cookies, Local, Session Storage

// Event Listener used to load the Name and City from local storage onto the page so it preisists
document.addEventListener("DOMContentLoaded", function () {
  const savedNameInput = localStorage.getItem(`nameInput`);
  const savedCityInput = localStorage.getItem(`cityInput`);
  const savedWeatherData = localStorage.getItem(`savedWeatherData`);

  // "if" coniditional is used because if the saved name is found in localStorage, it would be used to populate the name input field
  if (savedNameInput) {
    document.querySelector(".nameInput").value = savedNameInput;
  }

  if (savedCityInput) {
    document.querySelector(".cityInput").value = savedCityInput;
  }

  // Load Weather Data so that it persists if the data exists
  if (savedWeatherData) {
    const parsedWeatherData = JSON.parse(savedWeatherData); // This is used to convert the String data stored in Local storage into a javascript Object in order to display the Weather data
    displayWeatherInfo(parsedWeatherData); // This simply displays the data
  }
});

// Event Listener used to retrieve the toggle state from sessionStorage (But for some odd reason the toggle retrives the previous saved data but doesn't change the information on the data)
document.addEventListener("DOMContentLoaded", function () {
  // Get the saved data from sessionStorage
  const savedToggleState = sessionStorage.getItem("temp-toggle");

  if (savedToggleState) {
    // Set the toggle button state based on the saved value
    toggleButton.checked = savedToggleState === "on";

    // Ensure the unit is updated according to the toggle state
    unit = toggleButton.checked ? "imperial" : "metric";

    // If the city input has a value, re-fetch weather data to reflect the updated unit
    const savedCity = document.querySelector(".cityInput").value.trim();
    if (savedCity) {
      getWeatherData(savedCity); // Re-fetch weather data for the saved city
    }
  }
});

// Local storage used for last searched data or "Everything"
function saveLocalStorage(weatherData) {
  const nameData = document.querySelector(".nameInput").value;
  const cityData = document.querySelector(".cityInput").value;

  localStorage.setItem(`nameInput`, nameData);
  localStorage.setItem(`cityInput`, cityData);
  localStorage.setItem(`savedWeatherData`, JSON.stringify(weatherData)); // This a method that converts a JavaScript object (or array) into a JSON string. This allows it to store complex objects like weatherData in localStorage.
}

// Session storage used for City and Temp toggle
function saveSessionStorage() {
  const cityData = document.querySelector(".cityInput").value;
  const toggleData = document.getElementById("temp-toggle").checked
    ? "on"
    : "off";

  sessionStorage.setItem("temp-toggle", toggleData);
  sessionStorage.setItem(`cityInput`, cityData);
}

// Cookies used for Username
function saveCookie() {
  const nameData = document.querySelector(".nameInput").value; // This grabs whatever is in the name input field and saves it if it's valid

  if (nameData) {
    const expiryDate = new Date(); // Creates a date object
    expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Sets the expiry date to 30 days (Not sure if it works properly)

    document.cookie = `userName=${nameData}; expires=${expiryDate.toUTCString()}; path=/`; // First half is used to retrive the cookie while the second is used for the expiration date for the cookie,
  }
}

// Error Prevention

function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block"; // Make error message visible
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none"; // Hide error message
}
