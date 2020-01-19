'use strict';

require('dotenv').config();
const client = require('../client/client');
const superagent = require('superagent');
const Location = require('./location');
const errorHandler = require('../error/errorHandler');

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

module.exports = locationHandler;
