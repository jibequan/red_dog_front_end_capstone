"use strict";

// console.log("Hello main.js");

let $ = require('jquery'),
    login = require("./user"),
    nav_behavior= require("./nav_behavior"),
    popDom= require("./dom_builder");

let main_area = document.getElementById("main_content");
let nav = document.getElementById("nav_list");
let bikesNav = document.getElementById("bikes");
let partsNav = document.getElementById("parts");
let serviceNav = document.getElementById("service");
let rescueNav= document.getElementById("rescue");
let armyNav = document.getElementById("army");

nav.addEventListener("click", (e) => {
  nav_behavior.navSelected(e);
});

bikesNav.addEventListener("click", () => {
  nav_behavior.showContent.showBikes();
});

partsNav.addEventListener("click", () => {
  nav_behavior.showContent.showParts();
});

serviceNav.addEventListener("click", () => {
  nav_behavior.showContent.showService();
});

rescueNav.addEventListener("click", () => {
  nav_behavior.showContent.showRescue();
});

armyNav.addEventListener("click", () => {
  nav_behavior.showContent.showArmy();
});
