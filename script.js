const apiKey = "b9798d225b1a99f9180aa4f949faa8c0";

async function fetchData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log("response", data);
    return data;
  } catch (error) {
    console.error(error);
    alert("City not found");
    return null;
  }
}

async function insertData(city) {
  const data = await fetchData(city);
  console.log("response data here", data);
  if (!data) return;

  // Selecting the elements
  const weatherdescription = document.querySelector("#condition");
  const locationElement = document.querySelector(".location span");
  const temperatureElement = document.querySelector(".temperature .temp");
  const dateElement = document.querySelector(".week #wtime");
  const pressureElement = document.querySelector(".Pressure-box .content .pressure-index");
  const humidityElement = document.querySelector(".Humidity-box .content .humidity-index");
  const windElement = document.querySelector(".Wind-speed-box .content .windspeed-index");
  const visibilityElement = document.querySelector(".Visibility-box .content .visibility-index");
  const feelsLikeElement = document.querySelector(".feeling .feel span");
  const maxTemperatureElement = document.querySelector(".max_temperature .maxtemp span");
  const minTemperatureElement = document.querySelector(".min_temperature .mintemp span");
  const todaysDateElement = document.querySelector(".date .todays");

  // Updating the elements
  weatherdescription.innerHTML = `<p>${data.weather[0].description}</p>`;
  locationElement.textContent = data.name;
  temperatureElement.textContent = `${Math.floor(data.main.temp - 273.15)}°C`;
  pressureElement.textContent = `${data.main.pressure}hPa`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed}m/s Direction: ${data.wind.deg}°`;
  visibilityElement.textContent = `${data.visibility} meters`;
  feelsLikeElement.textContent = `${Math.floor(data.main.feels_like - 273.15)}°C`;
  maxTemperatureElement.textContent = `${Math.floor(data.main.temp_max - 273.15)}°C`;
  minTemperatureElement.textContent = `${Math.floor(data.main.temp_min - 273.15)}°C`;

  // Updating the default date to current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  todaysDateElement.textContent = currentDate;
 // Upadting the default time to current time  
  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  dateElement.textContent = currentTime;

  // Updating the weather icon to be seen on the web page
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("image").innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;
}
// updating the search button and input so that the inserted data can be seen 
const searchButton = document.querySelector("#buttonClick");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#inid").value;
  console.log("Search button clicked");
  insertData(searchInput);
});

// Inserting a default location
insertData("North Lincolnshire");
