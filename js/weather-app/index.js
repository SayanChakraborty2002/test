document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const btn = document.querySelector("button");
  const city = document.getElementById("city");
  const temp = document.getElementById("temp");
  const disc = document.getElementById("weather-desc");
  const weatherContainer = document.getElementById("weatherContainer");
  const errorContent = document.getElementById("errorContent");
  const KEY = "b79cd21ea81f8d4e63ca200bb4df3000";

  btn.addEventListener("click", async function () {
    const place = input.value.trim();
    if (!place) return;
    const data = await fetchUrl(place);
    if (!data) return;
    display(data);
  });

  async function fetchUrl(place) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${KEY}&units=metric`;
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) {
        console.log("Cannot get info");
        showErr();
        return;
      }
      const data = await res.json();
      if (data.cod !== 200) {
        showErr();
        return;
      }
      return data;
    } catch (err) {
      console.log("Cannot get info", err);
      showErr();
    }
  }
  function showErr() {
    weatherContainer.classList.add("hidden");
    errorContent.classList.remove("hidden");
  }

  function display(data) {
    weatherContainer.classList.remove("hidden");
    errorContent.classList.add("hidden");
    temp.textContent = `Temparature :${data.main.temp} °C`;
    disc.textContent = `Description: ${data.weather[0].description}`;
    city.textContent = `City: ${data.name}`;
  }
});
