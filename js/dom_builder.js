"use strict";

let db = require("./db-interaction"),
    user_info = require("./user_info"),
    user = require ("./user"),
    forms = require("./forms");

let main_content = document.getElementById("main_content");
let content = {};

content.showMyBikes = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>Hey ${user.getUser().displayName}. Here are your bikes.</h3>
  <p class="subheading">You can additional bikes or request service for one already associated with your account.</p>
  <button type="button" class="btn btn-dark" id="add_bike">+Add bike</button>
  <div id="gallery" class="row"></div>`;
  user_info.makeBikeGrid();
  let addBike = document.getElementById("add_bike");
  addBike.addEventListener("click", ()=>{
    forms.showBikeForm();
  });
};




function loadBikes() {
  //Get ID from currently logged in user
  let currentUser = user.getUser();
  //Go to the database via promise and get the bikes for that user
  db.getBikes(currentUser)
  //Once the data is back, format it and make it ready for the DOM
  .then((bikeData) => {
    user_info.makeBikeGrid(bikeData);
  });
}

module.exports = {content};
