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

// Define routes.
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventsHandler);
app.get('/movies', moviesHandler);
app.use('*', (req, res) => res.status(404).send('Page not found!'));

// Define functions.
function locationHandler(req, res) {
  let city = req.query.city;
  let sql = 'SELECT * FROM cities WHERE search_query = $1;';
  let values = [city];

  client.query(sql, values)
    .then(data => {
      if (data.rowCount) {
        res.status(200).send(data.rows[0]);
      } else {
        let key = process.env.GEOCODE_API_KEY;
        let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
        superagent.get(url)
          .then(data => {
            let geoData = data.body[0];
            let location = new Location(city, geoData);
            let newSQL = 'INSERT INTO cities (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
            let safeValues = [city, location.formatted_query, location.latitude, location.longitude];
            client.query(newSQL, safeValues);
            res.status(200).send(location);
          })
          .catch(() => errorHandler('LocationIQ API Error!', res));
      }
    })
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
      res.status(200).send(dailyWeather);
    })
    .catch(() => errorHandler('You borked DarkSky! You buffoon!', res));
}

function eventsHandler(req, res) {
  let {search_query} = req.query;
  let key = process.env.EVENTFUL_API_KEY;
  let url = `http://api.eventful.com/json/events/search?keywords=music&location=${search_query}&app_key=${key}`;

  superagent
    .get(url)
    .then(data => {
      let bigData = JSON.parse(data.text);
      let eventData = bigData.events.event.map(thisEvent => new Event(thisEvent));
      res.status(200).send(eventData);
    })
    .catch(() => errorHandler('You borked Eventful! You buffoon!', res));
}

function moviesHandler(req, res) {
  let key = process.env.MOVIEDB_API_KEY;
  let {search_query} = req.query;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search_query}`;
  superagent.get(url)
    .then(data => {
      let movies = data.body.results;
      let newMovie = movies.map(movie => new Movie(movie));
      res.status(200).send(newMovie);
    })
    .catch(() => errorHandler('You borked the MovieDB! You buffoon!', res));
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

function Movie(movieData) {
  this.title = movieData.title;
  this.overview = movieData.overview;
  this.average_votes = movieData.vote_average;
  this.total_votes = movieData.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`;
  this.popularity = movieData.popularity;
  this.released_on = movieData.release_date;
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
