"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config");

console.log("Hello db-interaction");

function getBikes(user) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/bikes.json?orderBy="uid"&equalTo="${user}"`
  }).done((bikeData) => {
    return bikeData;
  });
}

function addBike() {
  
}

module.exports = {};
