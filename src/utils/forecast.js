const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    // const url = 'http://api.weatherstack.com/forecast?access_key=95214ffa1d3992ddeacdf8d56f4033ec&query='+ lat +',' + long +'&units=f'
    const url = 'http://api.weatherstack.com/forecast?access_key=95214ffa1d3992ddeacdf8d56f4033ec&query='+ latitude +',' + longtitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to API forecast', undefined)
        } else if (body.error) {
            callback('Unable to find weather for this location!', undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_descriptions = body.current.weather_descriptions[0]
            callback(undefined, {temp, feelslike, weather_descriptions})
        }
    })
}

module.exports = forecast