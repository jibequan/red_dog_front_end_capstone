"use strict";

// console.log("Hello main.js");

let $ = require("jquery"),
	nav_behavior= require("./nav_behavior"),
	user = require("./user"),
	db = require("./db-interaction"),
	sb = require("./show_bikes"),
    dom = require("./dom_builder"),
    forms = require("./bike_forms"),
    response = require("./response");

let main_area = document.getElementById("main_content"),
	nav = document.getElementById("nav_list"),
	bikesNav = document.getElementById("bikes"),
	partsNav = document.getElementById("parts"),
	serviceNav = document.getElementById("service"),
	rescueNav= document.getElementById("rescue"),
	armyNav = document.getElementById("army");


nav.addEventListener("click", (e) => {
  nav_behavior.navSelected(e);
});

bikesNav.addEventListener("click", () => {
  dom.content.showBikes();
});

partsNav.addEventListener("click", () => {
  dom.content.showParts();
});

serviceNav.addEventListener("click", () => {
  dom.content.showService();
});

rescueNav.addEventListener("click", () => {
  dom.content.showRescue();
});

armyNav.addEventListener("click", () => {
  dom.content.showArmy();
});

var bid;

$(document).on("click", "#show_bikes", () => {
	let currentUser = user.getCompleteUser().uid;
	db.getBikes(currentUser)
	.then((data) => {
		sb.showMyBikes(data);
	});
});

$(document).on("click", "#add_bike", () => {
	forms.showBikeForm();
});

$(document).on("click", "#save_bike", () => {
	db.addBike(db.createBike())
	.then((result) => {
		db.addBikeId(result);
	});
	response.bikeAdded();
});

$(document).on("click", "#save_changes", () => {
	let editBike = db.createEdits();
	db.editBike(bid, editBike)
	.then((result) => {
		return result;
	});
	response.bikeUpdated();
});

$(document).on("click", "#cancel_changes", () => {
	let currentUser = user.getCompleteUser().uid;
	db.getBikes(currentUser)
	.then((data) => {
		sb.showMyBikes(data);
	});
});

$(document).on("click", ".delete_bike", (event) => {
	let bikeID = db.getBikeID(event);
	db.deleteBike(bikeID);
	response.bikeRemoved();
});

$(document).on("click", ".edit_bike", (event) => {
	forms.showEditBikeForm();
	bid = db.getBikeID(event);
});
