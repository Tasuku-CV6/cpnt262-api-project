# CPNT-262-A Weather Dashboard Mini Project

## Author: Ethan Dam

## Assignemnt Infomration:

In this Weather Dashboard Mini Project I will create a Weather Dashboard web app that fetches live weather data for a city using an API. I will also add personalization features using cookies, local storage, and session storage to make the app more user-friendly.

## Attributions:

- Unsplashed (Large body of Water Image): https://unsplash.com/photos/a-large-body-of-water-surrounded-by-snow-covered-mountains-SGkHT2afxv8
- W3Schools: Used for a bunch of documentation for reseaching and implementing HTML & CSS
- MDN documentation: Used for a bunch of documentation for reseaching and implementing Javascript
- Weatheropenmap API: https://openweathermap.org/api
- ChatGPT: I used ChatGPT as a resource to help me brainstorm and implement various JavaScript functions and features. While I didn't ask ChatGPT for full code snippets, it provided guidance on how to approach certain tasks, such as how to structure functions for fetching weather data, managing local storage, and handling user input. I used this guidance to better understand the problem-solving process and apply it to my project.

## Pseudocode:

1. ### Create variables to store:

- The weather form
- The city input field
- The name input field
- The card element where weather data will be displayed
- The toggle button to switch between Celsius and Fahrenheit
- The API key for the weather API
- The unit of temperature (Celsius or Fahrenheit)

2. ### When the tempertaure toggle button is clicked:

- If it's checked, set the temperature unit to Fahrenheit
- If it's not checked, set the temperature unit to Celsius
- If the city input is not empty, fetch the weather data again

3. ### Handle Form Submit:

- When the user submits the weather form:
- Prevent the default form submission behavior
- Save the name and city to session/local storage
- Get the city and name values from input fields
- If name is provided, show a personalized greeting
- If city is provided:
- Fetch weather data from weather API
- Display weather data on the card
- Save the weather data to localStorage
- If city is not provided, display an error message
- Validate name input and show/hide error messages accordingly

4. ### Show Personalized Greeting:

- Display a greeting alert with the user's name if provided

5. ### Fetch Weather Data: (Chose to use OpenWeatherMap because it provides accurate and detailed weather data. I'll handle errors by checking the response status and showing a user-friendly error message. Also it was the first one that I remembered us using in class so I was fimilar with it)

- Send an API request to OpenWeatherMap with the city name and API key
- If the response is successful, parse the weather data and display it
- If the response is not successful, throw an error with a message

6. ### Display Weather Information:

- Extract the city, temperature, humidity, weather description, and weather ID from the response data
- Create HTML elements for each piece of weather data (city, temperature, humidity, description, weather emoji)
- Append the data to the card element
- If any required weather data is missing or invalid, display an error message

7. ### Get Weather Emoji: (Weather condition IDs were found on the Weatheropenmap website)

- Based on the weather condition ID, return an appropriate emoji (e.g., 🌧️ for rain, ❄️ for snow)

8. ### Display Error: (I structured the error handling this way to make sure users are always aware when something goes wrong, like entering a non-existent city since that kind of Information can be extremely helpful)

- If any error occurs (e.g., invalid city, incomplete data), display an error message on the card

9. ### Handle Storage: (Local Storage used for Everything such as City, Name, and Weather Data, Session Storage used for City and Temp toggle, and Cookies were used for Name)

- Save name, city, and weather data to localStorage when form is submitted (Basically everything)
- Save city and temperature toggle state to sessionStorage
- Save Username as a Cookie for 30 days
- On page load, check for saved values in localStorage, sessionStorage, and Cookies
- If saved data is found, populate the form fields and display saved weather data

10. ### On Page Load: (Allows the data to persist even if the page is refreshed or reopened)

- Check if saved name, city, and weather data exist in localStorage
- If data exists, repopulate the form fields with saved data
- If weather data exists, display the saved weather info on the card
