$("#searchBtn").on("click", function() {
    var city = $("#input-field").val();
    if(city === "") {
        alert("City Name Cannot Be Blank");
    } 
    else {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=671a13776a4878dbbf19e402b9d91765";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            $("#city-label").text(response.name);
            $("#temp-label").text("Temperature: " + response.main.temp + " F");
            $("#humidity-label").text("Humidity: " + response.main.humidity + "%");

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=671a13776a4878dbbf19e402b9d91765&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)

                $("#uv-label").text("UV Index: " + response.value);
                
            })
            
        })

    }

})