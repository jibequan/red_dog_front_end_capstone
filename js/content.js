"use strict";

const bikesForSale = `\
  <div class="main__container--bikes">\
    <div class="main__header">
      <h3 class="main__heading">This is where bikes for sale will show.</h3>\
      <p class="main__subheading">This will show a gallery of bikes for sale.</p>\
    </div>\
  </div>`;

const partsForSale = `\
  <div class="main__container--parts">\
    <div class="main__header">
      <h3 class="main__heading">This is where user will be able to look for parts.</h3>\
      <p class="main__subheading">My hope is that this will have a pretty robust search.</p>\
    </div>\
  </div>`;

const showServiceSignIn = `\
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

let myBikes = (user) => {
  return  `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Hey ${user.displayName}. Here are your bikes.</h3>\
        <p class="main__subheading">You can additional bikes or request service for one already associated with your account.</p>\
        <button type="button" class="btn btn-dark" id="googLogout">Sign Out</button>\
        <button type="button" class="btn btn-dark" id="add_bike">+ Add bike</button>\
      </div>\
      <div id="gallery" class="main__supporting--service"></div>\
    </div>`;
};

let smallCard = (item) => {
  return `\
    <div id="${item.bikeID}" class="card">\
      <img class="card-img-top" src=${item.photo} alt="Photo of your moped/scooter">\
      <div class="card-body">\
        <h5 class="card-title">"${item.nickname}"<br>${item.year} ${item.make} ${item.model}</h5>\
        <p style="font-weight: bold" class="card-text">Repair History</p>\
        <div class="list-group">\
          <p>repair</p>\
        </div>\
        <a href="#" class="btn btn-danger delete_bike">Delete</a>\
        <a href="#" class="btn btn-secondary edit_bike">Edit</a>\
        <a href="#" class="btn btn-dark service_bike">Request Service</a>\
      </div>\
    </div>`;
};

let largeCard = (bike) => {
  return `\
    <div id="${bike.bikeID}"class="card gallery__card--large">
      <h5 class="card-title">"${bike.nickname}" | ${bike.year} | ${bike.make} | ${bike.model}</h5>
      <img class="card-img-top" src="http://via.placeholder.com/300x200" alt="Photo of your moped/scooter">
      <div class="card-body" style="border: 1px solid rgba(0, 0, 0, .125); padding: 0 1rem 0 1rem; border-radius: .25rem;">
        <p class="card-text">Repair History</p>
        <div class="list-group">
          <a href="#" class="list-group-item">02/14/2018: Cleaned carberator, new chain, fixed signal</a>
        </div>
      </div>
    </div>`;
};

const requestService = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Need us to take a look at your ride?</h3>\
        <p class="main__subheading">Fill out the information below and we can cook up a quote for you.</p>\
      </div>\
      <div id="gallery" class="main__supporting--service">\
        <div id="single-bike"></div>\
      </div>\
    </div>`;

const showRescue = `\
  <div class="main__container--rescue">\
    <div class="main__header">
      <h3 class="main__heading">This is where the user will be able to request a roadside rescue.</h3>\
      <p class="main__subheading">The plan is to tap into the mobile devices location.</p>\
    </div>\
  </div>`;

const showArmy = `\
  <div class="main__container--army">\
    <div class="main__header">
      <h3 class="main__heading">This is where the user will be able to see the Moped Army.</h3>\
      <p class="main__subheading">Maybe an API?</p>\
    </div>\
  </div>`;

module.exports = {bikesForSale, partsForSale, showServiceSignIn, myBikes, requestService, smallCard, largeCard, showRescue, showArmy};