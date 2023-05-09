const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.KEY}&q=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service! ' + error)
    } else if (response.body.error) {
      callback('Unable to find location! ')
    } else {
      callback(undefined, {
        condition: response.body.current.condition.text,
        tempCurrent: response.body.current.temp_c,
        feelLike: response.body.current.feelslike_c,
        humidity: response.body.current.humidity,
        tempMax: response.body.forecast.forecastday[0].day.maxtemp_c,
        tempMin: response.body.forecast.forecastday[0].day.mintemp_c,
        rainChance: response.body.forecast.forecastday[0].day.daily_chance_of_rain,
        currentTime: response.body.location.localtime,
        lastUpdated: response.body.current.last_updated
      })
    }
  })
}

module.exports = forecast;