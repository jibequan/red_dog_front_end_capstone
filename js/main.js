"use strict";

let $ = require('jquery'),
	nav_behavior= require('./nav_behavior'),
	user = require('./user'),
	db = require('./db-interaction'),
	dom = require('./dom_builder'),
	content = require('./content'),
	forms = require('./forms'),
	response = require('./response'),
	firebase = require('./fb-config'),
	authUser = require('./authentication');

let bikesNav = document.getElementById('bikes'),
	partsNav = document.getElementById("parts"),
	serviceNav = document.getElementById("service"),
	rescueNav= document.getElementById("rescue"),
	armyNav = document.getElementById("army"),
	fileUpload = document.getElementById('customFile');

//////////Basic Nav//////////
bikesNav.addEventListener("click", (e) => {
	nav_behavior.navSelected(e);
	dom.contentToDom(content.bikesForSale);
});

partsNav.addEventListener("click", (e) => {
	nav_behavior.navSelected(e);
	dom.contentToDom(content.partsForSale);
});

serviceNav.addEventListener("click", (e) => {
	nav_behavior.navSelected(e);
	if (firebase.auth().currentUser === null) {
		dom.contentToDom(content.showServiceSignIn);
	}else {
		db.checkFB(firebase.auth().currentUser);
	}
});

rescueNav.addEventListener("click", (e) => {
	nav_behavior.navSelected(e);
	dom.contentToDom(content.showRescue);
});

armyNav.addEventListener("click", (e) => {
	nav_behavior.navSelected(e);
	dom.contentToDom(content.showArmy);
});

//////////Sign In Options//////////
$(document).on('click', '#googLogin', (event) => {
  //Provide means of signing in with Google
  authUser.logInGoogle()
  .then((result) => {
	  let authedUser = result.user;
    //Check uid of current authenticated user against db to see if they exist
		db.checkFB(authedUser);
  });
});

$(document).on('click', '#guestLogin', (event) => {
	console.log("clicked on Guest Signin");
	dom.contentToDom(forms.guestForm);
});

$(document).on('click', '#googLogout', (event) => {
	//Provide means of signing out
	authUser.logOut()
	.then((result) => {
		dom.contentToDom(content.showServiceSignIn);		
	});
  });

//////////Button Behavior//////////
$(document).on("click", "#show_bikes", () => {
	let currentUser = firebase.auth().currentUser;
	db.getBikes(currentUser);
});

$(document).on("click", "#addBike", () => {
	dom.contentToDom(forms.addBikeForm);
});

$(document).on("click", "#addBike--save", () => {
	db.addBike(db.createBike());
});

$(document).on("click", "#addBike--cancel", () => {
	let currentUser = firebase.auth().currentUser;
	db.getBikes(currentUser);
});

$(document).on("click", ".deleteBike", (event) => {
	let bikeID = db.getBikeID(event);
	db.deleteBike(bikeID);
	dom.contentToDom(response.bikeRemoved);
});

$(document).on("click", ".editBike", (event) => {
	//Grab BikeID from containing element
	bid = db.getBikeID(event);
	//Get associated info from Firebase

	//Pass data into form
	dom.contentToDom(forms.updateBikeForm);
});

var bid;

$(document).on("click", "#updateBike--save", () => {
	db.updateBike(bid);
});

$(document).on("click", "#updateBike--cancel", () => {
	let currentUser = firebase.auth().currentUser;
	db.getBikes(currentUser);
});

$(document).on("click", ".serviceBike", (event) => {
	bid = db.getBikeID(event);
	db.requestBike(bid)
	.then((result) => {
		dom.showRequestBike(result);
		forms.requestServiceForm();
	});
});

$(document).on("click", ".submit_repair", (event) => {
	let updatedUser = db.createUpdatedUser();
	db.updateUser(user.getCompleteUser().fbID, updatedUser)
	.then((result) => {
		return result;
	});
	db.addRepair(db.createRepair(bid))
	.then((result) => {
		db.addRepairId(result);
		dom.contentToDom(response.requestReceived);
	});
});

$(document).on("click", ".guest_submit_repair", (event) => {
	dom.contentToDom(response.requestReceivedGuest);
});
