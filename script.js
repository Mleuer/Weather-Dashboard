var cityMap = new Map();

$("#searchBtn").on("click", function () {
    var city = $("#input-field").val();

    if (city === "") {
        alert("City Name Cannot Be Blank");
    }
    else {
        getWeatherByCityName(city);
        addListItem(city);
    }

})

$(".list-group").on("click", ".list-group-item", function () {
    var cityName = $(this).attr("data-name");
    getWeatherByCityName(cityName);
})

function renderCityList() {
    var map = new Map(JSON.parse(localStorage.cityMap));
    console.log(map);

    var iterator = map.values();

    for (var i = 0; i < map.size; i++) {
        var cityName = iterator.next().value
        var cityListItem = $("<li>").addClass("list-group-item").attr("data-name", cityName).text(cityName);
        $(".list-group").prepend(cityListItem);
    }
}

function addListItem(cityName) {
    var cityListItem = $("<li>").addClass("list-group-item").attr("data-name", cityName).text(cityName);
    $(".list-group").prepend(cityListItem);
}

function getWeatherByCityName(city) {
    $("#city-five-day").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=671a13776a4878dbbf19e402b9d91765";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#city-label").text(response.name);
        $("#temp-label").text("Temperature: " + response.main.temp + " F");
        $("#humidity-label").text("Humidity: " + response.main.humidity + "%");

        cityMap.set(response.name, response.name);
        localStorage.setItem("cityMap", JSON.stringify(Array.from(cityMap.entries())));


        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=671a13776a4878dbbf19e402b9d91765&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {

            $("#uv-label").text("UV Index: " + response.value);

        })

    })

    fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=671a13776a4878dbbf19e402b9d91765";

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 6; i < response.list.length; i = i + 8) {
            var weatherDiv = $("<div>").addClass("col").addClass("five-day");
            var date = $("<h5>").text(response.list[i].dt_txt);
            var symbol = $("<p>").text(response.list[i].weather[0].main);
            var temp = $("<p>").text("Temp: " + response.list[i].main.temp);
            var humidity = $("<p>").text("Hum: " + response.list[i].main.humidity + "%");

            weatherDiv.append(date, symbol, temp, humidity);
            $("#city-five-day").append(weatherDiv);

        }
    })
}

renderCityList();

