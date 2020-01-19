'use strict';

function errorHandler(err, res) {
  res.status(500).send(err);
}

module.exports = errorHandler;
