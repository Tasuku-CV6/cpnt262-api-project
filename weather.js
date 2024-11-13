// Variables

const weatherForm = document.querySelector(".weatherForm"); // Using querySelector to target spefiic class since there are no IDs
const cityInput = document.querySelector(".cityInput");
const nameInput = document.querySelector(".nameInput");
const card = document.querySelector(".card");
const apiKey = "bf274e853c8168a3dbc68ddce8b41d5d"; // Personal API key for Open Weather Map

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // This stops the "button" from submitting unless all require fields are met
  const city = cityInput.value.trim();
  const name = nameInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Enter a vaild City");
  }
});

// Functions:

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather Data");
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

  const cityDisplay = document.createElement("h1"); //Creating H1 Element using Javascript
  const tempDisplay = document.createElement("p"); //Creating Paragraph Element using Javascript
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmojiDisplay = document.createElement("p");

  cityDisplay.textContent = city; // Showing what is on the card when typing in a city to get information on the weatehr
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // Subtract 273.15 from the temp and then round it up to 1 decminal plcae using ".toFxed"
  humidityDisplay.textContent = `Humidity: ${humidity}%`; // "$" means placeholder, in this instance it's a place holder for "humidity"

  cityDisplay.classList.add("cityDisplay"); // Simply making CSS properties apply to the selected class
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");

  card.appendChild(cityDisplay); // Simply putting the "cityDisplay" box into the "card" box
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
}

function getWeatherEmoji(weatherId) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
