'use strict';

require('dotenv').config();
const superagent = require('superagent');
const Movie = require('./movie');
const errorHandler = require('../error/errorHandler');

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

module.exports = moviesHandler;
