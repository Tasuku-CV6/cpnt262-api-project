// Variables

const weatherForm = document.querySelector(".weatherForm"); // Using querySelector to target specific class since there are no IDs
const cityInput = document.querySelector(".cityInput");
const nameInput = document.querySelector(".nameInput");
const card = document.querySelector(".card");
const toggleButton = document.getElementById("temp-toggle");
const apiKey = "71fb92d443e2393b0235e8857901001f"; // Personal API key for Open Weather Map

// Default unit is set to Celsius or Fahrenheit
let unit = `metric`; // This is equaled to Celsius

// Event listener for toggle button to switch between Celsius & Fahrenheit
toggleButton.addEventListener(`change`, function () {
  unit = toggleButton.checked ? `imperial` : `metric`;
  if (cityInput.value.trim()) {
    getWeatherData(cityInput.value.trim()); // This if statement will re-fetch the weather data if the toggle is switched
  }
});

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // This stops the "button" from submitting unless all required fields are met
  saveSessionStorage();
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
      //Using Object Destructuring to extract values from Weather Data
      saveLocalStorage(
        JSON.stringify([
          {
            name: weatherData.main.name,
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            description: weatherData.weather[0].description,
            id: weatherData.weather[0].id,
          },
        ])
      );
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
  // Using Object Destructuring to extract values from Weather Data
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

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
// TODO: Make it so that when first entering the page, nothing is in the field and only making it repopulate only when saved
document.addEventListener("DOMContentLoaded", function () {
  const savedNameInput = localStorage.getItem(`nameInput`);
  const savedCityInput = localStorage.getItem(`cityInput`);
  const savedWeatherData = localStorage.getItem(`savedWeatherData`);

  if (savedNameInput) {
    document.querySelector(".nameInput").value = savedNameInput;
  }

  if (savedCityInput) {
    document.querySelector(".cityInput").value = savedCityInput;
  }

  console.log("savedWeatherData", JSON.parse(savedWeatherData));
  if (JSON.parse(savedWeatherData).length > 0) {
  }
});

function saveLocalStorage(weatherData) {
  const nameData = document.querySelector(".nameInput").value;
  const cityData = document.querySelector(".cityInput").value;

  localStorage.setItem(`nameInput`, nameData);
  localStorage.setItem(`cityInput`, cityData);
  // Weather data is saved in Local Storage but doens't persist like name and city, will have to explain furture impementation
  localStorage.setItem(`savedWeatherData`, weatherData);
}

function saveSessionStorage() {
  const cityData = document.querySelector(".cityInput").value;
  const toggleData = document.getElementById("temp-toggle").checked
    ? "on"
    : "off";

  sessionStorage.setItem("temp-toggle", toggleData);
  sessionStorage.setItem(`cityInput`, cityData);
}

// Doesn't work at the moment due to it not having a button, but for future implementation there will be a button that will trigger the saveCookie() function when clicked.
function saveCookie(nameInput) {
  let data = document.querySelector(`.${nameInput}`).value;
  document.cookie = `myCookie=${data}; max-age=300`;
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

// cookies for Username
// session storage City, Temp toggle
// local storage last searched data "Everything"
