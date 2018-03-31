"use strict";

console.log("Hello db-interaction");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user"),
    sb = require("./show_bikes"),
    forms = require("./bike_forms");
    

let main_content = document.getElementById("main_content");

let makeUser = {};
let makeBike = {};

makeUser.askFBForInfo = (uid) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
  }).done((resolve) => {
    return resolve;
  }).fail((error) => {
    return error;
  });
};

makeUser.checkFB = (uid) => {
  makeUser.askFBForInfo(uid)
  .then((result) => {
    let data = Object.values(result);
    if (data.length === 0){
      makeUser.addUser(makeUser.createUser())
        .then((result) => {
        user.setUserFbUglyId(result.name);
        forms.showBikeForm();
        });
  } else {
    user.setUserFbUglyId(Object.keys(result)[0]);
    makeBike.getBikes(user.getCompleteUser().uid)
      .then((data) => {
      sb.showMyBikes(data);
      });   
    }
  });
};

makeUser.createUser = () => {
  let newUser = {};
  newUser.uid = user.getUser().uid;
  newUser.fullName = user.getUser().displayName;
  newUser.email = user.getUser().email;
  return newUser;
};

makeUser.addUser = (newUser) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json`,
    type: 'POST',
    data: JSON.stringify(newUser),
    dataType: 'json'
  }).done((fbID) => {
    return fbID;
  });
};


makeBike.getBikes = (uid) => {
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


module.exports = {makeUser, makeBike};
