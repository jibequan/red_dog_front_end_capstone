"use strict";

let login = require("./user"),
    $ = require("jquery");

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

showContent.showLogin = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>Login to your account<h3>
  <p>See your bike repair history, request service, or request a roadside rescue.</p>
  <button type="button" class="btn btn-dark" id="googLogin">Sign In with Google</button>`;
  $("#googLogin").click(function(){
    console.log("clicked on Signin");
    login.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      login.setUser(result.user.uid);
      showContent.showService();
    });
  });
};

showContent.showBikes = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where bikes for sale will show<h3>
  <p>This will show a gallery of bikes for sale.</p>`;
};

showContent.showParts = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where user will be able to look for parts.<h3>
  <p>My hope is that this will have a pretty robust search.</p>`;
};

showContent.showService = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>Here are your bikes.<h3>
  <p>You can additional bikes or request service for one already associated with your account.</p><div class="col-sm-12"></div>`;
};

showContent.showRescue = function() {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where the user will be able to request a roadside rescue. <h3>
  <p>The plan is to tap into the mobile devices location.</p>`;
};


module.exports = {navSelected, showContent};
