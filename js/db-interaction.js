"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user"),
    forms = require("./forms"),
    show = require("./show_bikes"),
    ab = require("./add_Bikes");

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
        ab.showBikeForm();
      });
  } else {
    user.setUserFbUglyId(Object.keys(result)[0]);
    getBikes(user.getCompleteUser().uid)
    .then((data) => {
      console.log("This is the data", data);
      show.showMyBikes(data);
      });
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

let getBikes = (uid) => {
    console.log("What is this?", uid);
    return new Promise((resolve, reject) => {
    let bikesXHR = new XMLHttpRequest();

    bikesXHR.addEventListener("load", function() {
      let data = JSON.parse(this.responseText);
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


module.exports = {createUser, addUser, askFBForInfo, checkFB, getBikes};
