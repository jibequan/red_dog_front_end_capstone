"use strict";

// console.log("Hello dom_builder");

let $ = require("jquery"),
    user = require ("./user"),
    db = require("./db-interaction"),
    sb = require("./show_bikes"),
    forms = require("./bike_forms");

let main_content = document.getElementById("main_content");
let content = {};

content.showBikes = () => {
  main_content.innerHTML = `\
    <div class="main__container--bikes">\
      <div class="main__header">
        <h3 class="main__heading">This is where bikes for sale will show.</h3>\
        <p class="main__subheading">This will show a gallery of bikes for sale.</p>\
      </div>\
    </div>`;
};

content.showParts = () => {
  main_content.innerHTML = `\
    <div class="main__container--parts">\
      <div class="main__header">
        <h3 class="main__heading">This is where user will be able to look for parts.</h3>\
        <p class="main__subheading">My hope is that this will have a pretty robust search.</p>\
      </div>\
    </div>`;
};

content.showService = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Repair and Mod Options</h3>\
        <p class="main__subheading">Need us to wrench on your bike? If you haven’t had us look at it in the past, give us the lowdown and we can give it a peek.</p>\
        
      </div> <!--main__header-->\

      <div class="main__supporting">\
        <div class="supporting__card">\
          <p>Sign in with your Google account and you will be able to track the progress of your repair and revisit past repairs.</p>\
          <button type="button" class="btn btn-dark" id="googLogin">Sign In with Google</button>\
        </div>\
        <div class="supporting__card">\
          <p>Not on the best terms with the Googs? Not problem. You can still sign up for service as a guest. We’ve got you either way.
          </p>\
          <button type="button" class="btn btn-dark" id="guestLogin">Continue as Guest</button>\
        </div>
    </div>`;

  $("#googLogin").click(function(){
    user.logInGoogle()
    .then((result) => {
      db.checkFB(result.user.uid);
      db.getBikes(result.user.uid)
      .then((data)=> {
        // No user data? Change boilerplate text.
        sb.showMyBikes(data);
      });
    });
  });

  $("#guestLogin").click(function(){
      console.log("clicked on Guest Signin");
      forms.showGuestForm();
    });
  };

content.showRescue = () => {
  main_content.innerHTML = `\
    <div class="main__container--rescue">\
      <div class="main__header">
        <h3 class="main__heading">This is where the user will be able to request a roadside rescue.</h3>\
        <p class="main__subheading">The plan is to tap into the mobile devices location.</p>\
      </div>\
    </div>`;
};

content.showArmy = () => {
  main_content.innerHTML = `\
    <div class="main__container--army">\
      <div class="main__header">
        <h3 class="main__heading">This is where the user will be able to see the Moped Army.</h3>\
        <p class="main__subheading">Maybe an API?</p>\
      </div>\
    </div>`;
};

module.exports = {content};
