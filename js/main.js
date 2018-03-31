"use strict";

console.log("Hello main.js");

let nav_behavior= require("./nav_behavior"),
    dom = require("./dom_builder");

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