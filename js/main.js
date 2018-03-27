"use strict";

// console.log("Hello main.js");

let nav_behavior= require("./nav_behavior"),
    popDOM= require("./dom_builder");

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
  popDOM.content.showBikes();
});

partsNav.addEventListener("click", () => {
  popDOM.content.showParts();
});

serviceNav.addEventListener("click", () => {
  popDOM.content.showService();
});

rescueNav.addEventListener("click", () => {
  popDOM.content.showRescue();
});

armyNav.addEventListener("click", () => {
  popDOM.content.showArmy();
});
