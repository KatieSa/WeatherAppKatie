// variable
let humidity = document.querySelector("#humidity");
let h1 = document.querySelector("#locationName");
let citySearchForm = document.querySelector("form");
// variable where temperature need to be shown instead of text
let temperatureElement = document.querySelector("#temperature");
let geolocationButton = document.querySelector("#geolocation");

let apiKey = "de355d392425d33ae896129df7b80813";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

// listener to citySearchForm -> line 4
citySearchForm.addEventListener("submit", citySearchHandleSubmit);

// when I have all data from API ("response" variable), it will show:
// temperature, city name and humidity
//
function showTemperature(response) {
  console.log(response.data);

  // loaded function changing HTML text into different text
  // math.round makes temperature rounded
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  // loaded function changing HTML text into different text -> wind, humidity
  humidity.innerHTML = `${response.data.main.humidity}% humidity<br>${response.data.wind.speed}km/h wind`;

  // loaded function changing HTML text to city name
  h1.innerHTML = response.data.name;

  // scroll window back to top
  window.scroll(0, 0);
}

// function which get position from function 'getCurrentGeolocation'
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  // function showPosition is connecting with API,
  // when I have DATA from API I call function showTemperature
  axios
    .get(
      `${apiUrl}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
    )
    .then(showTemperature);
}

// After writing the city name in form this function will connect to API with city name and call function showTemperature with result
function citySearchHandleSubmit(event) {
  event.preventDefault();

  let locationInput = document.querySelector("#locationInput").value;

  axios
    .get(`${apiUrl}&q=${locationInput}&appid=${apiKey}`)
    .then(showTemperature);

  //h1.innerHTML = locationInput;
  //window.scroll(0, 0);
}

// function which shows your current position
function getCurrentGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// button defined in geolocationButton; after click call function getCurrentlocation
geolocationButton.addEventListener("click", getCurrentGeolocation);

let p = document.querySelector("#todayDate");

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let date = new Date();
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  p.innerHTML = `${formattedDate}`;
}
// function calls Date
formatDate();

// all below coverting Celsius to Farentheit
let converter = document.querySelector("a#convert");

converter.addEventListener("click", convertFormat);

function convertFormat(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature").innerHTML;

  let temperatureFormat = document.querySelector("#temperatureFormat")
    .innerHTML;

  if (temperatureFormat == "C") {
    // convert to F

    temperature = (temperature * 9) / 5 + 32;
    temperatureFormat = "F";

    document.querySelector("#temperature").innerHTML = temperature;
    document.querySelector("a#convert").innerHTML = "Convert to Celsius";
  } else {
    // convert to C

    temperature = ((temperature - 32) * 5) / 9;
    temperatureFormat = "C";

    document.querySelector("#temperature").innerHTML = Math.floor(temperature);
    document.querySelector("a#convert").innerHTML = "Convert to Farenheit";
  }

  document.querySelector("#temperatureFormat").innerHTML = temperatureFormat;
}
