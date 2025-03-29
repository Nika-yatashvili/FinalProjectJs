function fetchWeather(city = "Tbilisi") {
    const apiKey = '189b4480fa3f4cd9bd1211943252903'

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(
            (response) => response.json()
        ).then((data) => {
            console.log("data", data)
        })
}

fetchWeather("Tbilisi")