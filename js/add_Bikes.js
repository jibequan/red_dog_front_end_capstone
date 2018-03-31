"use strict";

console.log("Hello add_bikes");

let firebase = require("./fb-config"),
    $ = require('jquery'),
    user = require("./user");

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

function deleteBike(bike_Id) {
  $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/bikes/${bike_Id}.json`,
      method: "DELETE"
  }).done((data) => {
    return data;
  });
}


module.exports = {createBike, addBike, addBikeId, deleteBike};