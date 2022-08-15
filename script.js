let weather = {
  apiKey: apiKey,
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data)
        console.log(data);
      });
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const visibility = (data.visibility * 0.0006213712).toFixed(2);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".visibility").innerText = 
      "Visibility: " + visibility + " mi";

    document.querySelector(".weather").classList.remove("loading");
    
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
    
    document.querySelector(".search-bar").value = '';
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

let currLoc;
window.addEventListener('load', ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      let wet = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=439ef959fa3e64ec1df111e7619545b3`
      fetch(wet)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        currLoc = data.name
        console.log(currLoc);
        weather.fetchWeather(currLoc);
      })
    })
  }
})

//weather.fetchWeather('delhi');

