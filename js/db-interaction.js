"use strict";

// console.log("Hello db-interaction");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user"),
    sb = require("./show_bikes"),
    content = require("./dom_builder"),
    response = require("./response");

let main_content = document.getElementById("main_content");
var rootRef = firebase.database().ref();
var dbBikesRef = rootRef.child('bikes');

//////////Users//////////
//Ask Firebase for data in 'users' collection with specific uid
let askFBForInfo = (uid) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
  }).done((resolve) => {
    return resolve;
  }).fail((error) => {
    return error;
  });
};

let checkFB = (uid) => {
  //Ask Firebase for data in users collection with specific uid
  askFBForInfo(uid)
  .then((result) => {
  //User data is returned as object of objects
    //Create array from properties of parent object
    let data = Object.values(result);
    //If length of array is 0, no user exists | If length of array is 1, user already exists in "users" collection
    if (data.length === 0){
      //No existing user: take currentUser info and add to "users" collection in db
      addUser(createUser())
        .then((result) => {
        //Returned result is object like this ("name": "'ugly Firebase ID'")
        //Add 'ugly Firebase ID' to completeUser object
        user.setUserFbUglyId(result.name);
        });
  } else {
    //Get 'ugly Firebase ID' for existing user to completeUser object
    user.setUserFbUglyId(Object.keys(result)[0]);
    }
  });
};

let createUser = () => {
  let newUser = {};
  newUser.uid = user.getUser().uid;
  newUser.fullName = user.getUser().displayName;
  newUser.email = user.getUser().email;
  return newUser;
};

let addUser = (newUser) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users.json`,
    type: 'POST',
    data: JSON.stringify(newUser),
    dataType: 'json'
  }).done((fbID) => {
    return fbID;
  });
};

let createUpdatedUser = () => {
  let additionalUserInfo = {};

  if((document.getElementById("contact-area-code").value !== "") && (document.getElementById("contact-m-number").value !== "")) {
    additionalUserInfo.phone = document.getElementById("contact-area-code").value + document.getElementById("contact-m-number").value;
  }

  if (document.getElementById("contact-address").value !== "") {
    additionalUserInfo.address1 = document.getElementById("contact-address").value;
  }

  if (document.getElementById("contact-sec-address").value !== "") {
    additionalUserInfo.address2 = document.getElementById("contact-sec-address").value;
  }

  if (document.getElementById("contact-city").value !== "") {
    additionalUserInfo.city = document.getElementById("contact-city").value;
  }

  if (document.getElementById("contact-state").value !== "") {
    additionalUserInfo.state = document.getElementById("contact-state").value;
  }

  if (document.getElementById("contact-postal").value !== "") {
    additionalUserInfo.postal = document.getElementById("contact-postal").value;
  }
  return additionalUserInfo;
};

let updateUser = (uid, userObj) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/users/${uid}.json`,
    type: 'PATCH',
    data: JSON.stringify(userObj),
    dataType: 'json'
  }).done((result) => {
    return result;
  });
};

//////////Bikes//////////
let getBikes = (user) => {
  dbBikesRef.orderByChild('uid').equalTo(user.uid).once('value')
    .then((snap) => {
      var bikeData = snap.val();
      sb.showMyBikes(bikeData, user);
    });
  };

let requestBike = (bike_Id) => {
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

    bikesXHR.open('GET', `${firebase.getFBsettings().databaseURL}/bikes/${bike_Id}.json`);
    bikesXHR.send();
  });
};

let createBike = () => {
  //Create empty object for new bike
  let newBike = {};
  //Add uid from currentUser to new bike
  newBike.uid = firebase.auth().currentUser.uid;
  //Add values input by user on form, add to newbike
  newBike.nickname = document.getElementById("bike-nickname").value;
  newBike.photo = document.getElementById("customFile").value;
  newBike.year = document.getElementById("bike-year").value;
  newBike.make = document.getElementById("bike-make").value;
  newBike.model = document.getElementById("bike-model").value;
  newBike.comments = document.getElementById("bike-comments").value;
  return newBike;
};

let addBike = (bike) => {
  var newBikeRef = dbBikesRef.push();
  newBikeRef.set(bike);
  
  var bikeID = newBikeRef.key;
  newBikeRef.update({
    "bikeID": `${bikeID}`
  }).then((result) => {
      content.contentToDom(response.bikeAdded);
  });
};

let getBikeID = (event) => {
  let bid = event.target.parentNode.parentNode.id;
  return bid;
};

let createEdits = () => {
  let editBike = {};

  if (document.getElementById("bike-nickname").value !== "") {
    editBike.nickname = document.getElementById("bike-nickname").value;
  }

    if (document.getElementById("customFile").value !== "") {
    editBike.photo = document.getElementById("customFile").value;
  }

    if (document.getElementById("bike-year").value !== "") {
    editBike.year = document.getElementById("bike-year").value;
  }

    if (document.getElementById("bike-make").value !== "") {
    editBike.make = document.getElementById("bike-make").value;
  }

    if (document.getElementById("bike-model").value !== "") {
    editBike.model = document.getElementById("bike-model").value;
  }

  return editBike;
};

let editBike = (bike_Id, editBike) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/bikes/${bike_Id}.json`,
    type: 'PATCH',
    data: JSON.stringify(editBike),
    dataType: 'json'
  }).done((result) => {
    return result;
    });
};

let deleteBike = (bike_Id) => {
  dbBikesRef.child(bike_Id).remove();
};

//////////Repairs//////////
let createRepair = (bid) => {
  let newRepair = {
    bike_Id: bid,
    uid: user.getCompleteUser().uid,
    in_queue: false
  };

  if (document.getElementById("bike-comments").value !== "") {
    newRepair.issue = document.getElementById("bike-comments").value;
  }
  return newRepair;
};

let addRepairId = (result) => {
  let repair_Id = result.name;
  let obj = {
    "repair_Id" : repair_Id
  };

  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/repairs/${repair_Id}.json`,
    type: 'PATCH',
    data: JSON.stringify(obj),
    dataType: 'json'
  }).done((result) => {
    return result;
  });
};

let addRepair = (repairObj) => {
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/repairs.json`,
    type: 'POST',
    data: JSON.stringify(repairObj),
    dataType: 'json'
  }).done((result) => {
    return result;
  });
};

module.exports = {askFBForInfo, checkFB, createUser, addUser, createUpdatedUser, updateUser, getBikes, createBike, addBike, deleteBike, getBikeID, createEdits, editBike, requestBike, createRepair, addRepair, addRepairId};
