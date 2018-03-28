"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user"),
    forms = require("./forms");

// console.log("Hello db-interaction");

function askFBForInfo(uid) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
  }).done((resolve) => {
    return resolve;
  }).fail((error) => {
    return error;
  });
}

function checkFB(uid) {
  askFBForInfo(uid)
  .then((result) => {
    let data = Object.values(result);
    if (data.length === 0){
      addUser(createUser())
      .then((result) => {
        user.setUserFbUglyId(result.name);
        // getBikes(user.getCompleteUser().uid);
        forms.showBikeForm();
        console.log("went through the top");
      });
  } else {
    user.setUserFbUglyId(Object.keys(result)[0]);
    getBikes(user.getCompleteUser().uid);
    console.log("went through the bottom");
    }
  });
}

function createUser() {
  let info = user.getUser();
  let newUser = {};
  newUser.uid = info.uid;
  newUser.fullName = user.getUser().displayName;
  newUser.email = user.getUser().email;
  return newUser;
}

function addUser(newUser) {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json`,
    type: 'POST',
    data: JSON.stringify(newUser),
    dataType: 'json'
  }).done((fbID) => {
    return fbID;
  });
}

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
  }).done((bid) => {
    console.log(bid);
    return bid;
  });
}


let getBikes = (uid) => {
    console.log("What is this?", uid);
    return new Promise((resolve, reject) => {
    let bikesXHR = new XMLHttpRequest();

    bikesXHR.addEventListener("load", function() {
      let data = JSON.parse(this.responseText);
      console.log("data in call", data);
      resolve(data);
    });

    bikesXHR.addEventListener("error", function(){
      var error = bikesXHR.statusText;
      reject(error);
    });

    bikesXHR.open('GET', `${firebase.getFBsettings().databaseURL}/bikes.json?orderBy="uid"&equalTo="${uid}"`);
    bikesXHR.send();
  });
};


module.exports = {createBike, addBike, createUser, addUser, askFBForInfo, checkFB, getBikes};
