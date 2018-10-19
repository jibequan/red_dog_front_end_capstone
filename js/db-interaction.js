"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    user = require("./user"),
    dom = require("./dom_builder"),
    response = require("./response");

var rootRef = firebase.database().ref();
var dbBikesRef = rootRef.child('bikes');
var dbUsersRef = rootRef.child('users');

//////////Users//////////
let createUser = (authedUser) => {
  let userToCheck = {};
  userToCheck.uid = authedUser.uid;
  userToCheck.displayName = authedUser.displayName;
  userToCheck.email = authedUser.email;
  return userToCheck;
};

let addUser = (newUser) => {
  var newUserRef = dbUsersRef.push();
  newUserRef.set(newUser);

  //Use below if necessary later
  // var firebaseID = newUserRef.key;
  // newUserRef.update({
  //   "firebaseID": `${firebaseID}`
  // }).then((result) => {
  //     dom.contentToDom(response.bikeAdded);
  // });
};

let askFBForInfo = (userToCheck) => {
  dbUsersRef.orderByChild('uid').equalTo(userToCheck.uid).once('value', (snap) => {
    if (snap.val() == null) {
      addUser(userToCheck);
      getBikes(userToCheck);
    }else{
      getBikes(userToCheck);
    }
  });  
};  

let checkFB = (currentUser) => {
  let userToCheck = createUser(currentUser);
  askFBForInfo(userToCheck);
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
      dom.showMyBikes(bikeData, user);
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
  newBike.year = document.getElementById("bike-year").value;
  newBike.make = document.getElementById("bike-make").value;
  newBike.model = document.getElementById("bike-model").value;
  newBike.comments = document.getElementById("bike-comments").value;
  return newBike;
};

let checkForBikePic = () => {
  if (document.getElementById("customFile").files[0] != "") {
    return document.getElementById("customFile").files[0];
  }else{
    console.log("No file has been added.");
  }
};

let addBike = (bike) => {
  let bikePic = checkForBikePic();
  var newBikeRef = dbBikesRef.push();
  newBikeRef.set(bike);
  
  var bikeID = newBikeRef.key;
  let storageRef = firebase.storage().ref(`users/${bike.uid}/${bikeID}/pics/${bikePic.name}`);
  let uploadTask = storageRef.put(bikePic);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL()
    .then(function(downloadURL) {
      console.log('File available at', downloadURL);
      newBikeRef.update({
        "bikeID": `${bikeID}`,
        "photo": `${downloadURL}`
      }).then((result) => {
          dom.contentToDom(response.bikeAdded);
        });
    });
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
