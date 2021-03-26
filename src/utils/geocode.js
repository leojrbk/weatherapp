const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnF0dW5nIiwiYSI6ImNrbTdmN3J6azA4Yzcyd3F5OXBhNnpudXUifQ.dTcbUiUlOfXothrs-NgO9Q&limit=1'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            // console.log('Unable to connect to mapbox service!')
            callback('Unable to connect to mapbox service!', undefined)
        } else if (!body.features || (body.features.length ===0)) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longtitude = body.features[0].center[0]
            callback(undefined, {latitude,longtitude})
        }
    })
}

module.exports = geocode