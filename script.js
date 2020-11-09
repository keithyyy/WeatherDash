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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
            console.log(data);

        
            $(currentCity).html(data.name)



            

            
        })

    // displaying current weather



    // displaying the next 5 day forecast (use a for loop and DT is written in mil)
    
}





$("#searchButton").on("click", whatCity);