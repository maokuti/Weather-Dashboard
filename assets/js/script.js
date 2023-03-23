// Define global variables
var apiKey = "a5c22f1cbabed750811a803838de822b";
var searchInput = $("#search-input");
var searchForm = $("#search-form");
var searchHistory = $("#history");

// Define a function to get the weather data from the API
function getWeather(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

        // Make the API request
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Get the city name, date, icon, temperature, humidity, and wind speed from the response
    var cityName = response.name;
    var currentDate = moment().format("dddd, MMMM Do YYYY");
    var iconURL =
      "https://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png";
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;

    // Display the weather data on the page
    $("#today").html(`
      <h2 class="text-dark">${cityName} (${currentDate}) <img src="${iconURL}" alt="${response.weather[0].description}" /></h2>
      <p>Temperature: ${temperature} &deg;C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `);

    // Get the 5-day forecast for the city
    getForecast(city);
  });
}