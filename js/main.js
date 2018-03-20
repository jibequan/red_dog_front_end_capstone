"use strict";

console.log("Hello main.js");

let $ = require('jquery'),
    login = require("./user");

$("#login").click(function(){
  console.log("clicked on Signin");
  login.logInGoogle()
  .then((result) => {
    console.log("result from login", result.user.uid);
    login.setUser(result.user.uid);
    $("#login").addClass("is-hidden");
    // $("#logout").removeClass("is-hidden");
  });
});
