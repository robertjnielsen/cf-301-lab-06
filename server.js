'use strict';

// Declare requirements.
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Declare common variables.
const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS to allow our server to pass data to the front-end.
app.use(cors());

// Define routes.
app.get('/location', (req, res) => {
  try {
    const geoDataArray = require('./data/geo.json');
    const geoData = geoDataArray[0];
    let city = req.query.city;

    let location = new Location(city, geoData);
    res.status(200).send(location);
  } catch (error) {
    errorHandler('Something did not go as planned. Please try again.', res);
  }
});

app.get('/weather', (req, res) => {
  try {
    const weatherData = require('./data/darksky.json');
    const dailyWeather = weatherData.daily.data;

    res.status(200).send(dailyWeather.map(day => new Weather(day)));
  } catch (error) {
    errorHandler('Something did not go as planned. Please try again.', res);
  }
});

// Define functions.
function Location(city, localData) {
  this.search_query = city;
  this.formatted_query = localData.display_name;
  this.latitude = localData.lat;
  this.longitude = localData.lon;
}

function Weather(dailyForecast) {
  this.forecast = dailyForecast.summary;
  this.time = new Date(dailyForecast.time).toDateString();
}

function errorHandler(str, res) {
  res.status(500).send(str);
}

// Tell our server to listen on port variable PORT.
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
