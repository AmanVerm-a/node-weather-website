const path = require('path');
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aman Verma'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Aman Verma'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'You can contact me on my Email: amanofficial20@gmail.com or Mobile: +91-9479529882',
    name: 'Aman Verma'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ error: 'You must provide an address' })

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({ forecast: forecastData, location, address: req.query.address })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('page404', {
    title: 'Error - 404',
    name: 'Aman Verma',
    errorMessage: 'Help article not found!'
  });
})

app.get('*', (req, res) => {
  res.render('page404', {
    title: 'Error - 404',
    name: 'Aman Verma',
    errorMessage: 'Page not found!'
  });
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is up on http://localhost:${port}`))