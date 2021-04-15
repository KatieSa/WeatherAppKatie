// variable
let humidity = document.querySelector("#humidity");
let h1 = document.querySelector("#locationName");
let todayIcon = document.querySelector("#todayIcon");
let citySearchForm = document.querySelector("form");
// variable where temperature need to be shown instead of text
let temperatureElement = document.querySelector("#temperature");
let geolocationButton = document.querySelector("#geolocation");

let apiKey = "de355d392425d33ae896129df7b80813";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?cnt=5&units=metric`;



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
  humidity.innerHTML = `<span>${response.data.main.humidity}%</span> humidity<br><span>${response.data.wind.speed}</span> km/h wind`;

  // loaded function changing HTML text to city name
  h1.innerHTML = response.data.name;



  // todayIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png">`;
  todayIcon.innerHTML = `<img src="img/${response.data.weather[0].icon}.png">`;



  // scroll window back to top
  window.scroll(0, 0);

}


function showForecast(response) {

  console.log(response.data);

  let date = new Date();
  let loopCounter = 1;
  let loopDayCounter = date.getDay() + 1;
  response.data.list.forEach(function (day) {



    //alert(`Temperature is ${day.main.temp} (${day.weather[0].main}) (https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png)`);

    /*
        let date = new Date();
        let currentDay = days[date.getDay()];
    
        let formattedDate = `${currentDay}`;
    */


    if (loopDayCounter > 6) loopDayCounter = 0;
    let currentDay = days[loopDayCounter];

    //$('#forecastDay' + loopCounter + ' .card-title').
    $('#forecastDay' + loopCounter + ' .card-title').text(`${currentDay}`);

    let temp = Math.floor(day.main.temp);
    $('#forecastDay' + loopCounter + ' .card-subtitle').text(`${temp}°C`);
    $('#forecastDay' + loopCounter + ' .card-text').text(`${day.weather[0].main}`);
    //$('#forecastDay' + loopCounter + ' .weather-icon').html(`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">`);//@2x
    $('#forecastDay' + loopCounter + ' .weather-icon').html(`<img style="max-height:75px;padding-left:25px" src="img/${day.weather[0].icon}.png">`);//@2x

    loopCounter++;
    loopDayCounter++;
  });

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


  axios
    .get(
      `${apiUrlForecast}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
    )
    .then(showForecast);

}

// After writing the city name in form this function will connect to API with city name and call function showTemperature with result
function citySearchHandleSubmit(event) {

  event.preventDefault();

  let locationInput = document.querySelector("#locationInput").value;

  axios
    .get(`${apiUrl}&q=${locationInput}&appid=${apiKey}`)
    .then(showTemperature);


  axios
    .get(
      `${apiUrlForecast}&q=${locationInput}&appid=${apiKey}`
    )
    .then(showForecast);


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

  let date = new Date();
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay},  ${currentMonth} ${currentDate}, ${currentYear}`;

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
    document.querySelector("a#convert").innerHTML = "C";
  } else {
    // convert to C

    temperature = ((temperature - 32) * 5) / 9;
    temperatureFormat = "C";

    document.querySelector("#temperature").innerHTML = Math.floor(temperature);
    document.querySelector("a#convert").innerHTML = "F";
  }

  document.querySelector("#temperatureFormat").innerHTML = temperatureFormat;
}

// first page open.

$(function () {

  axios
    .get(`${apiUrl}&q=Valencia&appid=${apiKey}`)
    .then(showTemperature);

  axios
    .get(
      `${apiUrlForecast}&q=Valencia&appid=${apiKey}`
    )
    .then(showForecast);

})