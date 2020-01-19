'use strict';

function Weather(dailyForecast) {
  this.forecast = dailyForecast.summary;
  this.time = new Date(dailyForecast.time * 1000).toString().slice(0, 15);
}

module.exports = Weather;
