"use strict";

let db = require("./db-interaction"),
    template = require("./user_info"),
    login = require ("./user"),
    form = require("./forms");

let main_content = document.getElementById("main_content");
let content = {};

content.showMyBikes = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>Here are your bikes.</h3>
  <p class="subheading">You can additional bikes or request service for one already associated with your account.</p>
  <button type="button" class="btn btn-dark" id="add_bike">+Add bike</button>
  <div id="gallery" class="row"></div>`;
  template.makeBikeGrid();
  let addBike = document.getElementById("add_bike");
  addBike.addEventListener("click", ()=>{
    form.showBikeForm();
  });
};




function loadBikes() {
  //Get ID from currently logged in user
  let currentUser = login.getUser();
  //Go to the database via promise and get the bikes for that user
  db.getBikes(currentUser)
  //Once the data is back, format it and make it ready for the DOM
  .then((bikeData) => {
    template.makeBikeGrid(bikeData);
  });
}

module.exports = {content};
