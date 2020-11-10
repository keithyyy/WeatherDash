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
            forecastWeather(data.name)
        

            
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

function forecastWeather(city) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey;

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
            console.log(data);

            for (let i=1; i < 6; i++) {
                // 5 day forecast, increments every 3 hours. Have to multiply by 8 to get next 24hr
                var futureDate = new Date((data.list[(i*8)-1].dt)*1000).toLocaleDateString();
                
                
                $("#futureDay"+i).html(futureDate)
                $("#futureTemp"+i).html(data.list[(i*8)-1].main.temp + "°C")
                $("#futureHumid"+i).html(data.list[(i*8)-1].main.humidity + "%")
                
            }

            var tomorrow = new Date((data.list[8].dt)*1000)
            // console.log(tomorrow)

})} 



$("#searchButton").on("click", whatCity);