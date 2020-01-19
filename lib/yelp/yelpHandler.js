'use strict';

require('dotenv').config();
const superagent = require('superagent');
const Business = require('./business');
const errorHandler = require('../error/errorHandler');

function yelpHandler(req, res) {
  let key = process.env.YELP_API_KEY;
  let {latitude, longitude} = req.query;
  let url = `https://api.yelp.com/v3/businesses/search?term=delis&latitude=${latitude}&longitude=${longitude}`;
  superagent.get(url)
    .set('Authorization', `Bearer ${key}`)
    .then(data => {
      let businesses = JSON.parse(data.text).businesses;
      let business = businesses.map(thisBusiness => new Business(thisBusiness));
      res.status(200).send(business);
    })
    .catch(() => errorHandler('You borked Yelp! You buffoon!', res));
}

module.exports = yelpHandler;
