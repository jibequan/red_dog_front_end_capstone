"use strict";

console.log("Hello main.js");

let $ = require("jquery"),
	nav_behavior= require("./nav_behavior"),
	user = require("./user"),
	db = require("./db-interaction"),
	sb = require("./show_bikes"),
    dom = require("./dom_builder"),
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

$(document).on("click", "#show_bikes", () => {
	console.log("Did this work?");
	let currentUser = user.getCompleteUser().uid;
	db.getBikes(currentUser)
	.then((data) => {
		sb.showMyBikes(data);
	});
});

$(document).on("click", ".delete_bike", (event) => {
	console.log("hello?");
	let bid = event.target.parentNode.parentNode.id;
	db.deleteBike(bid);
	response.bikeRemoved();
	});

