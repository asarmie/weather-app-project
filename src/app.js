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

//Searching City Code
// function changes temp for searched city
function displayTemp(response) {
  let newMainCityTemp = response.data.main.temp;
  let newMainCityTempDisplayed = document.querySelector("#numerical-temp");
  newMainCityTempDisplayed.innerHTML = Math.round(`${newMainCityTemp}`);
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

// function that takes the inputted city and updates header as well as calls the API to get temp, description, max temp and min temp
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
}
//- - - - - - - - - - -  - - - - Bonus Code - - - - - - - - - - - - - - -
function displayCurrentLocationTemp(response) {
  let newMainCityTemp = response.data.main.temp;
  let newMainCityTempDisplayed = document.querySelector("#numerical-temp");
  newMainCityTempDisplayed.innerHTML = Math.round(`${newMainCityTemp}`);
}
function displayCurrentLocationWeatherDescription(response) {
  let newMainCityDescription = response.data.weather[0].description;
  let newMainCityDescriptionDisplayed =
    document.querySelector("#temp-description");
  newMainCityDescriptionDisplayed.innerHTML =
    `${newMainCityDescription}`.toUpperCase();
}
function displayCurrentLocationMinMaxTemp(response) {
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let newMinMaxTempDisplayed = document.querySelector("#min-max-temp");
  newMinMaxTempDisplayed.innerHTML = `MIN:${minTemp} MAX:${maxTemp}`;
}
function displayCurrentLocationName(response) {
  let newMainCityName = response.data.name;
  let newMainCityNameDisplayed = document.querySelector("#display-city");
  newMainCityNameDisplayed.innerHTML = `${newMainCityName}`;
}
// function to get location and then operate the function to display the temp for that location
function showPosition(position) {
  let latitudeElement = position.coords.latitude;
  let longitudeElement = position.coords.longitude;
  let units = "metric";

  let apiKey = "e011509df1b670bc25a4f046983a086b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeElement}&lon=${longitudeElement}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentLocationTemp);
  axios.get(apiUrl).then(displayCurrentLocationWeatherDescription);
  axios.get(apiUrl).then(displayCurrentLocationMinMaxTemp);
  axios.get(apiUrl).then(displayCurrentLocationName);
}
// function allows user to click button and then operates the function to get location
function changeToCurrentLocationInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", changeCityInfo);

let locate = document.querySelector("#location-button");
locate.addEventListener("click", changeToCurrentLocationInfo);
