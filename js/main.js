"use strict";

console.log("Hello main.js");

let $ = require('jquery'),
    login = require("./user"),
    blackout= require("./nav_behavior"),
    popDom= require("./dom_builder");

let main_area = document.getElementById("main_content");
let nav = document.getElementById("nav_list");
let loginNav = document.getElementById("login");
let serviceNav = document.getElementById("service");
let bikesNav = document.getElementById("bikes");
let partsNav = document.getElementById("parts");
let rescueNav= document.getElementById("rescue");


nav.addEventListener("click", (e) => {
  blackout.navSelected(e);
});

loginNav.addEventListener("click", () => {
  popDom.showContent.showLogin();
});

bikesNav.addEventListener("click", () => {
  popDom.showContent.showBikes();
});

partsNav.addEventListener("click", () => {
  popDom.showContent.showParts();
});

serviceNav.addEventListener("click", () => {
  popDom.showContent.showService();
});

rescueNav.addEventListener("click", () => {
  popDom.showContent.showRescue();
});
