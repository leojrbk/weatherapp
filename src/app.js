const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// Set up static dir to serve
app.use(express.static(publicDirectoryPath))

// Setup dynamic
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tung Leo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Tung Bui'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        name: 'Leo Messi'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecast_data) => {
            if (error) {
                // return console.log(error)
                return res.send({error })
            }
            // console.log(forecast_data)
            res.send({
                temp: forecast_data.temp,
                feelslike: forecast_data.feelslike,
                location: req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        error_msg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        error_msg: "Page not found!"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

