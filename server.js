'use strict';

// Declare global dependencies.
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Declare location dependencies.
const locationHandler = require('./lib/location/locationHandler');
const weatherHandler = require('./lib/weather/weatherHandler');
const eventsHandler = require('./lib/events/eventsHandler');
const moviesHandler = require('./lib/movies/moviesHandler');
const yelpHandler = require('./lib/yelp/yelpHandler');

// Application setup.
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

// Database connection config.
const client = require('./lib/client/client');

// Define routes.
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventsHandler);
app.get('/movies', moviesHandler);
app.get('/yelp', yelpHandler);
app.use('*', (req, res) => res.status(404).send('Page not found!'));

// Connect to database, and listen on PORT if successful.
client
  .connect()
  .then(() => {
    console.log('pg client connected');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    throw `PG Startup Error: ${err.message}`;
  });
