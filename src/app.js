//Time &  Date Code
let now = new Date();

let currentMonth = now.getMonth();
let currentDay = now.getDate();
let currentYear = now.getFullYear();
let currentWeekDay = now.getDay();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let months = [
  "JANURARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
let finalMonth = months[currentMonth];
let weekDays = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let finalWeekDay = weekDays[currentWeekDay];

let currentMonthUpdate = document.querySelector("#current-month");
currentMonthUpdate.innerHTML = `${finalMonth}`;

let currentDayUpdate = document.querySelector("#current-day");
currentDayUpdate.innerHTML = `${currentDay}`;

let currentYearUpdate = document.querySelector("#current-year");
currentYearUpdate.innerHTML = `${currentYear}`;

let currentWeekDayUpdate = document.querySelector("#current-week-day");
currentWeekDayUpdate.innerHTML = `${finalWeekDay}`;

let currentHourUpdate = document.querySelector("#current-hour");
if (currentHour < 10) {
  currentHourUpdate.innerHTML = `0${currentHour}`;
} else {
  currentHourUpdate.innerHTML = `${currentHour}`;
}

let currentMinuteUpdate = document.querySelector("#current-minute");
if (currentMinute < 10) {
  currentMinuteUpdate.innerHTML = `0${currentMinute}`;
} else {
  currentMinuteUpdate.innerHTML = `${currentMinute}`;
}

function formatDate(timestamp) {
  let dayDate = new Date(timestamp * 1000);
  let day = dayDate.getDay();
  let days = ["SUN", "MON", "TUES", "WED", "THRU", "FRI", "SAT"];
  return days[day];
}

// function to display forecast
function displayForecast(response) {
  let forecastInfo = response.data.daily;
  console.log(forecastInfo);
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastInfo.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="day">${formatDate(forecastDay.dt)}</div>
        <div class="col-2 day-icon">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"/>
        </div>
        <div class="col-2 day-temp">
          <span>${Math.round(forecastDay.temp.day)}</span>ºF
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "e011509df1b670bc25a4f046983a086b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

// function changes temp for searched city
function displayTemp(response) {
  let newMainCityTemp = response.data.main.temp;
  fahrenheitTemp = response.data.main.temp;
  let newMainCityTempDisplayed = document.querySelector("#numerical-temp");
  newMainCityTempDisplayed.innerHTML = Math.round(`${newMainCityTemp}`);

  getForecast(response.data.coord);
}
// function changes temp description for search city
function displayWeatherDescription(response) {
  let newMainCityDescription = response.data.weather[0].description;
  let newMainCityDescriptionDisplayed =
    document.querySelector("#temp-description");
  newMainCityDescriptionDisplayed.innerHTML =
    `${newMainCityDescription}`.toUpperCase();
}
// function changes max temp for searched city
function displayMinMaxTemp(response) {
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let newMinMaxTempDisplayed = document.querySelector("#min-max-temp");
  newMinMaxTempDisplayed.innerHTML = `MIN:${minTemp} MAX:${maxTemp}`;
}
//function changes the middle icon to current temp icon
function displayTempIcon(response) {
  let tempIcon = response.data.weather[0].icon;
  let newTempIcon = document.querySelector("#weather-pic");
  newTempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${tempIcon}@2x.png`
  );
}
//function changes wind speed
function displayWindSpeed(response) {
  let windSpeed = Math.round(response.data.wind.speed);
  let newWindSpeed = document.querySelector("#display-wind-speed");
  newWindSpeed.innerHTML = `${windSpeed}`;
}
//function takes current temp and converts it to C by clicking celsius link
function displayCalculatedCelsius(event) {
  event.preventDefault();
  let calculatedCelsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let displayedCalculatedCelsiusTemp =
    document.querySelector("#numerical-temp");
  displayedCalculatedCelsiusTemp.innerHTML = Math.round(
    `${calculatedCelsiusTemp}`
  );
}
//function changes the temp back to F by clicking fahrenheit link
function displayCalculatedFahrenheit(event) {
  event.preventDefault();
  let displayedFahrenheitTemp = document.querySelector("#numerical-temp");
  displayedFahrenheitTemp.innerHTML = Math.round(`${fahrenheitTemp}`);
}
// function that takes the inputted city and updates header as well as calls the API to get temp, description, max temp and min temp, temp image
function changeCityInfo(event) {
  event.preventDefault();
  let searchInputText = document.querySelector("#search-engine-input-text");
  let newMainCityDisplayed = document.querySelector("#display-city");
  newMainCityDisplayed.innerHTML = `${searchInputText.value}`;

  let cityName = `${searchInputText.value}`;
  let unit = "imperial";
  let apiKey = "e011509df1b670bc25a4f046983a086b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemp);
  axios.get(apiUrl).then(displayWeatherDescription);
  axios.get(apiUrl).then(displayMinMaxTemp);
  axios.get(apiUrl).then(displayTempIcon);
  axios.get(apiUrl).then(displayWindSpeed);
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-button");
form.addEventListener("click", changeCityInfo);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCalculatedCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayCalculatedFahrenheit);
