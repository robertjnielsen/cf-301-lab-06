'use strict';

// Declare requirements.
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

// Declare common variables.
const app = express();
const PORT = process.env.PORT || 3001;
const locations = {};
const forecasts = {};

// Use CORS to allow our server to pass data to the front-end.
app.use(cors());

// Define routes.
app.get('/location', locationHandler);

app.get('/weather', weatherHandler);

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
        locations[url] = location;
        res.status(200).send(location);
      })
      .catch(() => errorHandler('You borked the interwebs! You buffoon!', res));
  }
}

function weatherHandler(req, res) {
  const key = process.env.DARKSKY_API_KEY;
  const lat = req.query.latitude;
  const lon = req.query.longitude;
  const url = `https://api.darksky.net/forecast/${key}/${lat},${lon}`;

  if (forecasts[url]) {
    res.send(forecasts[url]);
  } else {
    superagent
      .get(url)
      .then(data => {
        const weatherData = data.body.daily.data;
        const dailyWeather = weatherData.map(day => new Weather(day));
        forecasts[url] = dailyWeather;
        res.status(200).send(dailyWeather);
      })
      .catch(() => errorHandler('You borked the interwebs! You buffoon!', res));
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
  this.time = new Date(dailyForecast.time * 1000).toString().slice(0, 15);
}

function errorHandler(str, res) {
  res.status(500).send(str);
}

// Tell our server to listen on port variable PORT.
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
