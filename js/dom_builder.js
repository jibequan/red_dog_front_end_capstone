"use strict";

let db = require("./db-interaction"),
    user = require ("./user"),
    $ = require("jquery"),
    forms = require("./forms");

let main_content = document.getElementById("main_content");
let content = {};

content.showBikes = () => {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where bikes for sale will show</h3>
  <p>This will show a gallery of bikes for sale.</p>`;
};

content.showParts = () => {
  main_content.innerHTML = `<h3>This is where user will be able to look for parts.</h3>
  <p>My hope is that this will have a pretty robust search.</p>`;
};

content.showService = () => {
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
    user.logInGoogle()
    .then((result) => {
      db.checkFB(result.user.uid);
    });

    });

  $("#guestLogin").click(function(){
    console.log("clicked on Guest Signin");
    forms.showGuestForm();
    });
};

content.showMyBikes = () => {
  main_content.innerHTML = `<h3>Hey ${user.getUser().displayName}. Here are your bikes.</h3>
  <p class="subheading">You can additional bikes or request service for one already associated with your account.</p>
  <button type="button" class="btn btn-dark" id="add_bike">+ Add bike</button>
  <div id="gallery" class="row"></div>`;
  //ask FB for user's bikes using their FBUglyID using user.getUserFbUglyId

  makeBikeGrid();
  let addBike = document.getElementById("add_bike");
  addBike.addEventListener("click", ()=>{
    forms.showBikeForm();
  });
};

content.showRescue = () => {
  //update with helper functions
  main_content.innerHTML = `<h3>This is where the user will be able to request a roadside rescue. </h3>
  <p>The plan is to tap into the mobile devices location.</p>`;
};

content.showArmy = () => {
  main_content.innerHTML = `<h3>This is where the user will be able to see the Moped Army. </h3>
  <p>Maybe an API?</p>`;
};

function makeBikeGrid() {
  document.getElementById("gallery").innerHTML = `<div class="card col-sm-6">
    <img class="card-img-top" src="images/ShredPed1.0.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">"Nickname" | Year | Make | Model</h5>
      <p class="card-text">Repair History</p>
      <div class="list-group">
        <a href="#" class="list-group-item">02/14/2018: Cleaned carberator, new chain, fixed signal</a>
      </div>
      <a href="#" class="btn btn-danger">Delete</a>
      <a href="#" class="btn btn-secondary">Edit</a>
      <a href="#" class="btn btn-dark">Request Service</a>
    </div>
  </div>`;
}

module.exports = {content};
