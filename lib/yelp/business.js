'use strict';

function Business(businessData) {
  this.name = businessData.name;
  this.image_url = businessData.image_url;
  this.price = businessData.price;
  this.url = businessData.url;
}

module.exports = Business;
