"use strict";

let firebase = require("./fb-config"),
    $ = require('jquery'),
    user = require("./user");

console.log("FBURL", firebase.getFBsettings().databaseURL);

function createBike() {
  let newBike = {};
  newBike.uid = user.getCompleteUser().uid;
  newBike.nickname = document.getElementById("bike-nickname").value;
  newBike.photo = document.getElementById("customFile").value;
  newBike.year = document.getElementById("bike-year").value;
  newBike.make = document.getElementById("bike-make").value;
  newBike.model = document.getElementById("bike-model").value;
  newBike.comments = document.getElementById("bike-comments").value;
  return newBike;
}

function addBike(bike) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/bikes.json`,
    type: 'POST',
    data: JSON.stringify(bike),
    dataType: 'json'
  }).done((result) => {
     return result;
  });
}

function addBikeId(result) {
  let bike_Id = result.name;
  let obj = {
    "bike_Id" : bike_Id
  };
  console.log("This is the obj", obj);    
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/bikes/${bike_Id}.json`,
    type: 'PATCH',
    data: JSON.stringify(obj),
    dataType: 'json'
  }).done((result) => {
    return result;
  });
}


function showBikeForm(){
  let main_area = document.getElementById("main_content");
  main_area.innerHTML =
  `<h3>Add A Bike to Your Account</h3>
  <p class="subheading">New ride? Sweet! Just add it in here to make service simple should you ever need it.
  </p>
    <form>
      <fieldset>
        <legend>Bike Information</legend>
            <div class="form-group">
              <label for="bike-nickname">Nickname</label>
              <input id="bike-nickname" class="form-control" type="text" placeholder="Nickname">
            </div>
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">Upload image of your bike</label>
              <input type="file" class="custom-file-input" id="customFile">
            </div>
            <div class="form-group">
                <label for="bike-year">Year</label>
                <input id="bike-year" class="form-control" type="text" placeholder="Year">
            </div>
            <div class="form-group">
              <label for="bike-make">Make</label>
              <input id="bike-make" class="form-control" type="text" placeholder="Make">
            </div>
            <div class="form-group">
              <label for="bike-model">Model</label>
              <input id="bike-model" class="form-control" type="text" placeholder="Model">
            </div>
            <div class="form-group">
              <label for="bike-comments">Comments</label>
              <textarea id="bike-comments" class="form-control" rows="3" placeholder="Comments"></textarea>
            </div>
      </fieldset>
        <!-- Add Bike/Submit Button -->
          <button type="button" class="btn btn-danger" value="CANCEL">Cancel</button>
          <button type="button" class="btn btn-dark" id="add_bike" value="ADD BIKE">Add Bike</button>
    </form>`;
  document.getElementById("add_bike").addEventListener("click", () => {
    console.log("Did you get here?");
    addBike(createBike())
    .then((result) => {
      addBikeId(result);
    });
  });
}

module.exports = {showBikeForm};