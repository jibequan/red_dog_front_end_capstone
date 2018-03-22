"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    template = require("./display_template"),
    login = require ("./user");


function loadBikes() {
  //Get ID from currently logged in user
  let currentUser = login.getUser();
  //Go to the database via promise and get the bikes for that user
  db.getBikes(currentUser)
  //Once the data is back, format it and make it ready for the DOM
  .then((bikeData) => {
    template.makeBikeGrid(bikeData);
  })
}

module.exports = {};
