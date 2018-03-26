"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user");

// console.log("Hello db-interaction");

function createUser() {
  let newUser = {};
  newUser.uid = user.getUser().uid;
  newUser.fullName = user.getUser().displayName;
  newUser.email = user.getUser().email;
  return newUser;
}

function addUser(user) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json`,
    type: 'POST',
    data: JSON.stringify(user),
    dataType: 'json'
  }).done((uid) => {
    console.log("And now for something completely different.", uid);
    return uid;
  });
}

function createBike() {
  let newBike = {};
  newBike.uid = user.getUser();
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
  }).done((bid) => {
    return bid;
  });
}


module.exports = {createBike, addBike, createUser, addUser};
