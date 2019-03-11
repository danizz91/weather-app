const request = require('request')
var fahrenheitToCelsius = require('fahrenheit-to-celsius');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b1dab12b1c342c66174034f39e820efb/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + fahrenheitToCelsius(body.currently.temperature).toFixed() + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast