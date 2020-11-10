var city = "";
var searchedCity = $("#searchedCity");
var searchButton = $("#searchButton");
var clearButton = $("#clearButton");
var currentCity = $("#currentCity");
var currentTemp = $("#currentTemperature");
var currentHumid = $("#currentHumidity");
var currentWS = $("#currentWindSpeed");
var currentUv = $("#currentUvIndex");
var searchHis = [];


var apiKey = "ef28f4f6c11b000f409a1416557dc4d7";




function whatCity(event) {
    event.preventDefault();
    city = searchedCity.val().trim();
    console.log(city);
    addHistory(city);
    displayWeather(city);
    
}

function addHistory(c) {
    var historyList = $("<li>" + c + "</li>");
    $(historyList).addClass("list-group-item")
    $(historyList).attr("data-value", c);
    $(".list-group").prepend(historyList);


}

function displayWeather(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
            console.log(data);

            // displaying current weather
            var currentDate = new Date(data.dt * 1000).toLocaleDateString();
            $(currentCity).html(data.name+" ("+currentDate+")");
            $(currentTemp).html(data.main.temp + " ° C");
            $(currentHumidity).html(data.main.humidity+"%");
            $(currentWS).html(data.wind.speed+"KM/H"); 
            
            uvLat = data.coord.lat; 
            uvLon = data.coord.lon;
            displayUV(uvLat, uvLon);
        

            
        });  
};

// displaying UVindex
function displayUV(lat,lon) {
    var apiUvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" +lat+"&lon="+lon+"&appid=" + apiKey;

    fetch(apiUvUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            $(currentUv).html(data.value)
            $(currentUv).addClass("rounded px-2 py-2")

            if (data.value < 2) {
                $(currentUv).addClass("bg-success")
            } else if (data.value > 5) {
                $(currentUv).addClass("bg-danger")
            } else {
                $(currentUv).addClass("bg-warning")
            }
        })
}


    // displaying the next 5 day forecast (use a for loop and DT is written in mil)




$("#searchButton").on("click", whatCity);