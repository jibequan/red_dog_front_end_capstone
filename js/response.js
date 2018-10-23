"use strict";

const bikeAdded = `\
    <div class="main__container--service">
      <div class="container__header">\
        <h3>Your bike has been added to your account.</h3>\
        <p>Head back to your bikes to request service for another one of your bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
      </div>\
    </div>`;

const bikeRemoved = `\
    <div class="main__container--service">\
      <div class="container__header">\
        <h3>This bike has been removed from your account.</h3>\
        <p>Head back to your bikes to request service for another one of your bikes or to edit your bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
    	</div>\
    </div>`;

const bikeUpdated = `\
    <div class="main__container--service">\
      <div class="container__header">\
        <h3>This bike has been updated.</h3>\
        <p>Head back to your bikes to request service for this bike or update one of your other bikes.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
    	</div>\
    </div>`;

const requestReceived = `\
    <div class="main__container--service">\
      <div class="container__header">\
        <h3>Your request has been successfully sent.</h3>\
        <p>We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>\
        <button type="button" class="btn btn-dark" id="show_bikes">Back to My Bikes</button>\
      </div>\
    </div>`;

const requestReceivedGuest = `\
    <div class="main__container--service">\
      <div class="container__header">\
        <h3>Your request has been successfully sent.</h3>\
        <p>We'll get back to you shortly with a quote and arrange a time to pickup your bike for service.</p>\
      </div>\
    </div>`;

module.exports = {bikeAdded, bikeRemoved, bikeUpdated, requestReceived, requestReceivedGuest};
