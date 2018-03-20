"use strict";

console.log("Hello main.js");

let $ = require('jquery'),
    login = require("./user"),
    blackout= require("./nav_behavior");


let main_area = document.getElementById("main_content");
let nav = document.getElementById("nav_list");

// $("#login").click(function(){
//   console.log("clicked on Signin");
//   login.logInGoogle()
//   .then((result) => {
//     console.log("result from login", result.user.uid);
//     login.setUser(result.user.uid);
//     $("#login").addClass("is-hidden");
//     $("#logout").removeClass("is-hidden");
//   });
// });

nav.addEventListener("click", (e) => {
  blackout.navSelected(e);
});
