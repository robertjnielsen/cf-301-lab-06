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
  const geoDataArray = require('./data/geo.json');
  const geoData = geoDataArray[0];
  let city = req.query.city;

  let location = new Location(city, geoData);
  res.send(location);
});

app.get('/weather', (req, res) => {
  const weatherData = require('./data/darksky.json');
  const dailyWeather = weatherData.daily.data;
  let dailyArray = [];

  dailyWeather.forEach(day => {
    dailyArray.push(new Weather(day));
  });
  res.send(console.log(dailyArray));
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

// Tell our server to listen on port variable PORT.
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
