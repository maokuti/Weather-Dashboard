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

// Define a function to get the 5-day forecast for a city
function getForecast(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;
  
    // Make the API request
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Create an array of the forecast data for each day
      var forecastData = response.list.filter(function (forecast) {
        return forecast.dt_txt.includes("12:00:00");
      });
  
      // Create HTML for each day's forecast and add it to the page
      $("#forecast").html("");
      for (var i = 0; i < forecastData.length; i++) {
        var forecast = forecastData[i];
        var iconURL =
          "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var date = moment(forecast.dt_txt).format("ddd, MMM Do");
  
        var forecastHTML = `
          <div class="col-lg-2">
            <div class="card bg-primary text-white">
              <div class="card-body p-2">
                <h5 class="card-title">${date}</h5>
                <img src="${iconURL}" alt="${forecast.weather[0].description}" />
                <p class="card-text">Temp: ${temperature} &deg;C</p>
                <p class="card-text">Humidity: ${humidity}%</p>
              </div>
            </div>
          </div>
        `;
        $("#forecast").append(forecastHTML);
      }
    });
  }

  // Define a function to handle the form submission
    searchForm.on("submit", function (event) {
    event.preventDefault();
    var city = searchInput.val().trim();
    if (city) {
    // Get the weather data for the city and add it to the search history
    getWeather(city);
    addToSearchHistory(city);
    searchInput.val("");
    }
    });
    
    // Define a function to add a city to the search history
    function addToSearchHistory(city) {
    // Create a button for the city and add it to the search history
    var button = $("<button>").addClass("btn btn-secondary").text(city);
    searchHistory.append(button);
    
    // Add an event listener to the button to get the weather data for the city when it is clicked
    button.on("click", function () {
    getWeather(city);
    });
    }

    // Define a function to load the last searched city on page load
    function loadLastSearchedCity() {
    // Get the last searched city from local storage
    var lastSearchedCity = localStorage.getItem("lastSearchedCity");
    
    if (lastSearchedCity) {
    // Get the weather data for the last searched city
    getWeather(lastSearchedCity);
    }
    }
    
    // Call the loadLastSearchedCity function on page load
    loadLastSearchedCity();
    