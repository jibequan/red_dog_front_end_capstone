"use strict";

let $ = require('jquery'),
    loginUser = require("./user");

let showContent = {};

let login = document.getElementById("login");
let main_content = document.getElementById("main_content");

showContent.showLogin = function() {
  main_content.innerHTML = `<h3>Login to your account<h3>
  <p>See your bike repair history, request service, or request a roadside rescue.</p>
  <button type="button" class="btn btn-dark" id="googLogin">Sign In with Google</button>`;
  $("#googLogin").click(function(){
    console.log("clicked on Signin");
    loginUser.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      login.setUser(result.user.uid);
      // $("#login").addClass("is-hidden");
      // $("#logout").removeClass("is-hidden");
    });
  });
};

showContent.showBikes = function() {
  main_content.innerHTML = `<h3>This is where bikes for sale will show<h3>
  <p>This will show a gallery of bikes for sale.</p>`;
};

showContent.showParts = function() {
  main_content.innerHTML = `<h3>This is where user will be able to look for parts.<h3>
  <p>My hope is that this will have a pretty robust search.</p>`;
};

showContent.showService = function() {
  main_content.innerHTML = `<h3>This is where the user's bikes will show<h3>
  <p>There will be general information about the bikes and the ability to see past repairs.</p>`;
};

showContent.showRescue = function() {
  main_content.innerHTML = `<h3>This is where the user will be able to request a roadside rescue. <h3>
  <p>The plan is to tap into the mobile devices location.</p>`;
};

module.exports = {showContent};
