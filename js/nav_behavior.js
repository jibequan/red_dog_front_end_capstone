"use strict";

let login = require("./user"),
    $ = require("jquery"),
    forms = require("./forms"),
    popDOM = require("./dom_builder");

let loginDiv = document.getElementById("login");
let main_content = document.getElementById("main_content");

let showContent = {};

function removeSelected() {
  let selected = document.getElementsByClassName('item_selected');
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.replace("item_selected", "lights");
  }
}

function navSelected(e) {
    removeSelected();
    let parentDiv = e.target.parentNode;
    if (parentDiv.classList.contains("lights") == true) {
      parentDiv.classList.replace("lights", "item_selected");
    }else if (parentDiv.classList.contains("lights") == false) {
      let lights = parentDiv.querySelector(".lights");
      lights.classList.replace("lights", "item_selected");
    }
}

showContent.showBikes = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where bikes for sale will show</h3>
  <p>This will show a gallery of bikes for sale.</p>`;
};

showContent.showParts = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where user will be able to look for parts.</h3>
  <p>My hope is that this will have a pretty robust search.</p>`;
};

showContent.showService = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>Repair and Mod Options</h3>
  <p class="subheading">Need us to wrench on your bike? If you haven’t had us look at it in the past, give us the lowdown and we can give it a peek.
  </p>
  <p>Step 1 -> <span class="disabled">Step 2 -> </span><span class="disabled">Step 3</span></p>
  <p>Sign in with your Google account and you will be able to track the progress of your repair and revisit past repairs.</p>
  <button type="button" class="btn btn-dark" id="googLogin">Sign In with Google</button>
  <p>Not on the best terms with the Googs? Not problem. You can still sign up for service as a guest. We’ve got you either way.
  </p>
  <button type="button" class="btn btn-dark" id="guestLogin">Sign In as Guest</button>`;
  $("#googLogin").click(function(){
    console.log("clicked on Google Signin");
    login.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      login.setUser(result.user.uid);
      popDOM.content.showMyBikes();
    });
  });
  $("#guestLogin").click(function(){
    console.log("clicked on Guest Signin");
    forms.showGuestForm();
    });
};

showContent.showRescue = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where the user will be able to request a roadside rescue. </h3>
  <p>The plan is to tap into the mobile devices location.</p>`;
};

showContent.showArmy = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where the user will be able to see the Moped Army. </h3>
  <p>Maybe an API?</p>`;
};


module.exports = {navSelected, showContent};
