"use strict";

console.log("Hello response");

let bikeAdded= () => {
  let main_content = document.getElementById("main_content");
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>Your bike has been added to your account.</h3>
    <p class="subheading">Head back to your bikes to request service for another one of your bikes.
    <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>
	</div>`;
};

module.exports = {bikeAdded};