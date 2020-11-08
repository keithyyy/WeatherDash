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

var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


function showWeather(event) {
    event.preventDefault();
    city = searchedCity.val().trim();
    console.log(city);
    addHistory(city);
    
}

function addHistory(c) {
    var historyList = $("<li>" + c + "</li>");
    $(historyList).addClass("list-group-item")
    $(historyList).attr("data-value", c);
    $(".list-group").prepend(historyList);


}





$("#searchButton").on("click", showWeather);