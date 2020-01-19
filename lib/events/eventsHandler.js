'use strict';

require('dotenv').config();
const superagent = require('superagent');
const Event = require('./event');
const errorHandler = require('../error/errorHandler');

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

module.exports = eventsHandler;
