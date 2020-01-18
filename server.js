'use strict';

// Load environment variables from configuration.
require('dotenv').config();

// Declare application dependencies.
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Application setup.
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

// Database connection config.
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => {
  throw err;
});

// Declare common variables.
const locations = {};
const forecasts = {};

// Define routes.
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventsHandler);

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

function eventsHandler(req, res) {
  let {search_query} = req.query;
  let key = process.env.EVENTFUL_API_KEY;
  let url = `http://api.eventful.com/json/events/search?keywords=music&location=${search_query}&app_key=${key}`;

  superagent
    .get(url)
    .then(data => {
      let bigData = JSON.parse(data.text);
      let events = bigData.events.event.map(thisEvent => new Event(thisEvent));
      res.status(200).send(events);
    })
    .catch((err) => errorHandler(err, res));
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

function Event(eventData) {
  this.name = eventData.title;
  this.event_date = eventData.start_time.slice(0, 10);
  this.link = eventData.url;
  this.summary = eventData.description;
}

function errorHandler(err, res) {
  res.status(500).send(err);
}

// Connect to database, and listen on PORT if successful.
client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    throw `PG Startup Error: ${err.message}`;
  });
