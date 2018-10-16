"use strict";

let $ = require('jquery'),
	nav_behavior= require('./nav_behavior'),
	user = require('./user'),
	db = require('./db-interaction'),
	sb = require('./show_bikes'),
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
	dom.contentToDom(content.showServiceSignIn);
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
    //Check uid of current authenticated user against db to see if they exist
    db.checkFB(result.user.uid);
    //If they do, get the bikes associated with that user
    db.getBikes(result.user.uid);
  });
});

$(document).on('click', '#guestLogin', (event) => {
	console.log("clicked on Guest Signin");
	dom.contentToDom(forms.guestForm);
});

var bid;

//////////Button Behavior//////////
$(document).on("click", "#show_bikes", () => {
	let currentUser = firebase.auth().currentUser.uid;
	db.getBikes(currentUser);
});

$(document).on("click", "#add_bike", () => {
	dom.contentToDom(forms.addBikeForm);
});

$(document).on("click", "#save_bike", () => {
	db.addBike(db.createBike());
});

$(document).on("click", ".delete_bike", (event) => {
	let bikeID = db.getBikeID(event);
	db.deleteBike(bikeID);
	dom.contentToDom(response.bikeRemoved);
});

$(document).on("click", ".edit_bike", (event) => {
	dom.contentToDom(forms.editBikeForm);
	bid = db.getBikeID(event);
});

$(document).on("click", "#save_changes", () => {
	let editBike = db.createEdits();
	db.editBike(bid, editBike)
	.then((result) => {
		return result;
	});
	dom.contentToDom(response.bikeUpdated);
});

$(document).on("click", "#cancel_changes", () => {
	let currentUser = user.getCompleteUser().uid;
	db.getBikes(currentUser)
	.then((data) => {
		sb.showMyBikes(data);
	});
});

$(document).on("click", ".cancel", () => {
	let currentUser = user.getCompleteUser().uid;
	db.getBikes(currentUser)
	.then((data) => {
		sb.showMyBikes(data);
	});
});

$(document).on("click", ".service_bike", (event) => {
	bid = db.getBikeID(event);
	db.requestBike(bid)
	.then((result) => {
		sb.showRequestBike(result);
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
