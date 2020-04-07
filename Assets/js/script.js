function openWeatherMapApi(city) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=624f9a5512645f4e434f1a1d56910742&units=imperial',
    method: "GET",
  }).then(function(response) {   
    console.log(response)
    var date          = moment().format("MM-DD-YYYY");
    console.log(date)
    var nameH1        = $("<h1>").text(response.name + " (" + date + ")");
    var temperatureP  = $("<p>").text("Temperature: " + response.main.temp + "° F");
    var humidityP     = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var windSpeedP    = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
    $('#currentWeather').append(nameH1,temperatureP,humidityP,windSpeedP);
  });

  function myCallback(response) {
    var result = [response.coord.lon,response.coord.lat];
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/uvi?appid=624f9a5512645f4e434f1a1d56910742&lat=${response.coord.lon}&lon=${response.coord.lat}&units=imperial`,
    method: "GET",
  }).then(function(response) {
    var uvP = `<p>UV Index: <span class="btn btn-danger">${response.value}</span></p>`
    $('#currentWeather').append(uvP);
  });      
  }

  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=624f9a5512645f4e434f1a1d56910742&units=imperial',
    method: "GET",
    success: myCallback
  });

  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=624f9a5512645f4e434f1a1d56910742&units=imperial',
    method: "GET",
  }).then(function(response) {
    console.log(response);
    // console.log(showIcon(response.list[i].weather[0].main))
    for(var i = 0; i < response.list.length; i += 8){
      var html = `
      <div class="card text-white bg-primary mb-3" style="max-width: 10rem;">
        <div class="card-body text-white">
          <h5 class="card-title">${moment(response.list[i].dt_txt).format("MM-DD-YYYY")}</h5>
          <p>Temp: ${response.list[i].main.temp  + "° F"}</p>
          <p>${response.list[i].weather[0].main}</p>
          <p>Humidity: ${response.list[i].main.humidity + "%"}</p>
        </div>
      </div>

      `;
      $('#forecastInput').append(html);
    }
  });
}

function savedList(city){
  var historyButton = `<button type="button" class="history"> ${city} </button>`;
  $('#searchHistory').append(historyButton);
}

function showIcon(weather){
  if(weather === 'Rain'){
    return '<i class="fas fa-cloud-rain"></i>';
  }else if(weather === 'Clouds'){
    return '<i class="fas fa-cloud"></i>';
  }else if(weather === 'Clear'){
    return '<i class="fas fa-sun"></i>';
  }
}

$(document).on("click", "#button", function(event){
  // $('.row').text("");
  var cityInput = $("#cityInput").val().trim();
  openWeatherMapApi(cityInput);
  savedList(cityInput);
});

// $(document).on("click", ".history", function(event){
//   var historyInput = $("#cityInput").val().trim();
//   // openWeatherMapApi(cityInput);
//   savedList(cityInput);
// });

// $(document).on("click", ".list-group", function(event){
//   var button = $this.val().trim();
//   openWeatherMapApi(button)
// });

// var nameH1 = `
//           <h1>${city}</h1>
//           <p>Temperature: ${list[0].main.temp}</p>
//           <p>Humidity: ${list[0].main.temp}</p>
//           <p>Wind Speed: ${list[0].wind.speed}</p>
//           `;



/* 
$("<div>").addclass("col-lg-4");

<div class = 'card forecast'>
  <h5 class="card-title">${moment(response.list[i].dt_txt).format("MM-DD-YYYY")}</h5>  
  <p>Temp: ${response.list[i].main.temp}</p>
  <p>Humidity: ${response.list[i].main.humidity}</p>
</div>
</div> */

// <div class="card text-white bg-primary mb-3" style="max-width: 11rem;">
//         <div class="card-body">
//           <h5 class="card-title">${moment(response.list[i].dt_txt).format("MM-DD-YYYY")}</h5>
//           <p>Temp: ${response.list[i].main.temp}</p>
//           <p>Humidity: ${response.list[i].main.humidity}</p>

//           <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
//   <div class="card-header">Header</div>
//   <div class="card-body">
//     <h5 class="card-title">Primary card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>

/* <div class='col-3'>
  <div class="card">
    <div class="card-image">
      <img src="images/sample-1.jpg">        
    </div>
      <div class="card-content">
      <p>I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively.</p>
      </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <button class="calendar">Add to Itinerary</button>
      </div>
  </div>
</div>

<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-body text-success">
    <h5 class="card-title"></h5>
    <p class="card-text"></p>
  </div>
</div>

<div class="card text-white bg-primary mb-3" style="max-width: 11rem;">
        <div class="card-body">
          <h5 class="card-title">${moment(response.list[i].dt_txt).format("MM-DD-YYYY")}</h5>
          <p>Temp: ${response.list[i].main.temp}</p>
          <p>Humidity: ${response.list[i].main.humidity}</p>
        </div>
</div> */