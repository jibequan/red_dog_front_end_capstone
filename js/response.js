"use strict";

// console.log("Hello response");

let main_content = document.getElementById("main_content");

let bikeAdded = () => {
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>Your bike has been added to your account.</h3>
    <p class="subheading">Head back to your bikes to request service for another one of your bikes.</p>
    <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>
	</div>`;
};

let bikeRemoved = () => {
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>This bike has been removed from your account.</h3>
    <p class="subheading">Head back to your bikes to request service for another one of your bikes or to edit your bikes.</p>
    <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>
	</div>`;
};

let bikeUpdated = () => {
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>This bike has been updated.</h3>
    <p class="subheading">Head back to your bikes to request service for this bike or update one of your other bikes.</p>
    <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>
	</div>`;
};

let requestReceived = () => {
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>Your response has been succesfully sent.</h3>
    <p class="subheading">We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>
    <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>
  </div>`;
};

let requestReceivedGuest = () => {
  main_content.innerHTML = `<div class="col-sm-10">
    <h3>Your response has been succesfully sent.</h3>
    <p class="subheading">We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>  </div>`;
};

module.exports = {bikeAdded, bikeRemoved, bikeUpdated, requestReceived, requestReceivedGuest};