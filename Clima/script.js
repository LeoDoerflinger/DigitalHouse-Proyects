document.getElementById("get-weather-btn").addEventListener("click", function () {
  const apiKey = "020c01d6e6dfa1a6901226ce1fe2cb2d"; // Reemplaza con tu clave de API de OpenWeatherMap
  const city = document.getElementById("city-input").value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;

  if (city === "") {
    alert("Por favor, ingresa una ciudad.");
    return;
  }

  fetchWeather(url);
});

document.getElementById("get-location-btn").addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "020c01d6e6dfa1a6901226ce1fe2cb2d"; // Reemplaza con tu clave de API de OpenWeatherMap
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

      fetchWeather(url);
    }, function (error) {
      alert("Error al obtener la ubicación. Asegúrate de permitir el acceso a tu ubicación.");
      console.error("Error:", error);
    });
  } else {
    alert("La geolocalización no está soportada en tu navegador.");
  }
});

function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("Ciudad no encontrada. Verifica la ortografía o intenta con otra ciudad.");
        console.error(data.message);
        return;
      }

      if (data.cod === "401") {
        alert("Clave de API inválida. Verifica que tu API Key sea correcta.");
        console.error(data.message);
        return;
      }

      // Mostrar la ciudad junto con el país
      const cityAndCountry = `${data.name}, ${data.sys.country}`;
      document.getElementById("city-name").textContent = cityAndCountry;

      // Convertir la temperatura a un número entero
      const temperature = parseInt(data.main.temp);
      document.getElementById("temperature").textContent = `Temperatura: ${temperature}°C`;

      // Convertir la descripción del clima a mayúsculas
      const description = data.weather[0].description.toUpperCase();
      document.getElementById("description").textContent = description;

      // Usar íconos de mayor resolución (4x)
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      document.getElementById("weather-result").style.display = "block";
    })
    .catch(error => {
      alert("Error al obtener el clima. Revisa tu conexión a internet o intenta nuevamente.");
      console.error("Error:", error);
    });
}

document.getElementById("theme-toggle-btn").addEventListener("click", function () {
  const isDarkTheme = document.body.classList.toggle("dark-theme");

  // Cambiar el ícono del botón según el tema activo
  const themeIconLight = document.getElementById("theme-icon");
  const themeIconDark = document.getElementById("theme-icon-dark");

  if (isDarkTheme) {
    themeIconLight.style.display = "none";
    themeIconDark.style.display = "inline"; // Muestra el ícono de luna
  } else {
    themeIconLight.style.display = "inline"; // Muestra el ícono de sol
    themeIconDark.style.display = "none";
  }
});
