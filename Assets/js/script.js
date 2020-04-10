function openWeatherMapApi(city) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=624f9a5512645f4e434f1a1d56910742&units=imperial',
    method: "GET",
  }).then(function(response) {  
    console.log(response.weather[0].icon)
    $('#currentWeather').empty();
    var date          = moment().format("MM-DD-YYYY");
    var nameH1        = $("<h1>").text(response.name + " (" + date + ")" + " ");
    var temperatureP  = $("<p>").text("Temperature: " + response.main.temp + "° F");
    var humidityP     = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var windSpeedP    = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
    $('#currentWeather').append(nameH1,temperatureP,humidityP,windSpeedP);
  });
}

function myCallback(response) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/onecall?appid=624f9a5512645f4e434f1a1d56910742&lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial`,
    method: "GET",
  }).then(function(response) {
    console.log(response)
    var forecastH1 = `<h1> 5 Day Forecast: </h1>`
    var uvP;
    switch(true){
      case response.current.uvi > 8:
        uvP = `<p>UV Index: <span class="btn btn-danger">${response.current.uvi}</span></p>`;
      break;
      case response.current.uvi < 2:
        uvP = `<p>UV Index: <span class="btn btn-success">${response.current.uvi}</span></p>`;
      break;
      default:
        uvP = `<p>UV Index: <span class="btn btn-warning">${response.current.uvi}</span></p>`;
    }
    $('#currentWeather').append(uvP, forecastH1);
    $('#forecastInput').empty();
      for(var i = 0; i < 5; i++){    
        var html = `
        <div class="col-lg-2 card text-white bg-primary mb-3 mr-3 mt-3" style="max-width: 15rem max-height: 10rem">
          <div class="card-body text-white">
            <h5 class="card-title">${moment().add(i+1, 'd').format("MM/DD/YYYY")}</h5>
            <img src="${"http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png"}" alt="Icon">
            <p>Temp: ${response.daily[i].temp.day + "° F"}</p>
            <p>Humidity: ${response.daily[i].humidity + "%"}</p>
          </div>
        </div>
        `;
        $('#forecastInput').append(html);
      }
  });      
}

function getCoordinates(city){
$.ajax({
  url: 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=624f9a5512645f4e434f1a1d56910742&units=imperial',
  method: "GET",
  success: myCallback
});
}

function savedList(city){
  var historyButton =  $("<button>").addClass("history").text(city).attr('id', city);
  $('#searchHistory').append(historyButton);
  // $('#cityInput').empty();
}

$(document).on("click", "#button", function(event){
  var cityInput = $("#cityInput").val().trim();
  openWeatherMapApi(cityInput);
  savedList(cityInput);
  getCoordinates(cityInput);
});

$(document).on("click", ".history", function(event){
  // This is a variable that contains the ID of the button clicked.
  var buttonId = $(this).attr("id");
  console.log(buttonId)
  openWeatherMapApi(buttonId);
  savedList(buttonId);
  getCoordinates(buttonId);
});
