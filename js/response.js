"use strict";

// console.log("Hello response");

let main_content = document.getElementById("main_content");

let bikeAdded = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">
      <div class="main__header">\
        <h3 class="main__heading">Your bike has been added to your account.</h3>\
        <p class="main__subheading">Head back to your bikes to request service for another one of your bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
      </div>\
    </div>`;
};

let bikeRemoved = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">This bike has been removed from your account.</h3>\
        <p class="main__subheading">Head back to your bikes to request service for another one of your bikes or to edit your bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
    	</div>\
    </div>`;
};

let bikeUpdated = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">This bike has been updated.</h3>\
        <p class="main__subheading">Head back to your bikes to request service for this bike or update one of your other bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
    	</div>\
    </div>`;
};

let requestReceived = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Your request has been successfully sent.</h3>\
        <p class="main__subheading">We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
      </div>\
    </div>`;
};

let requestReceivedGuest = () => {
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Your request has been successfully sent.</h3>\
        <p class="main__subheading">We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>\
      </div>\
    </div>`;
};

module.exports = {bikeAdded, bikeRemoved, bikeUpdated, requestReceived, requestReceivedGuest};
