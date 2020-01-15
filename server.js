'use strict';

// Declare requirements.
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

// Declare common variables.
const app = express();
const PORT = process.env.PORT || 3001;
let locations = {};

// Use CORS to allow our server to pass data to the front-end.
app.use(cors());

// Define routes.
app.get('/location', locationHandler);

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
function locationHandler(req, res) {
  let city = req.query.city;
  let key = process.env.GEOCODE_API_KEY;
  let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  if (locations[url]) {
    res.send(locations[url]);
  } else {
    superagent
      .get(url)
      .then(data => {
        let geoData = data.body[0];
        let location = new Location(city, geoData);
        res.status(200).send(location);
      })
      .catch(() => errorHandler('Something is borked, good job!', res));
  }
}

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
