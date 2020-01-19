'use strict';

const superagent = require('superagent');
const Weather = require('./weather');
const errorHandler = require('../error/errorHandler');

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

module.exports = weatherHandler;
