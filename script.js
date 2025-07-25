const apiKey = "26518d9d7dc98afcb5b1350f12983010";
const weatherDiv = document.getElementById("weather");

// Get weather by coordinates
function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => {
      weatherDiv.innerHTML = `<p>❌ Error fetching weather data.</p>`;
      console.error(err);
    });
}

// Get weather by city
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return alert("Please enter a city name");
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        weatherDiv.innerHTML = `<p>⚠️ City not found!</p>`;
      }
    })
    .catch(err => {
      weatherDiv.innerHTML = `<p>❌ Error fetching weather data.</p>`;
      console.error(err);
    });
}

// Display weather data
function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { description, icon } = data.weather[0];

  weatherDiv.innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p><strong>${description.toUpperCase()}</strong></p>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌬️ Wind Speed: ${speed} m/s</p>
  `;
}

// Try to get user's location on load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoords(lat, lon);
    },
    error => {
      weatherDiv.innerHTML = `<p>⚠️ Location access denied. Please search by city.</p>`;
    }
  );
} else {
  weatherDiv.innerHTML = `<p>⚠️ Geolocation not supported by your browser.</p>`;
}
