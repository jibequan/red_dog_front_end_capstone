"use strict";

// console.log("Hello show_bikes");

let user = require("./user"),
    db = require("./db-interaction");

let main_content = document.getElementById("main_content");

function prepRepairs(repair_data) {
  let repair = Object.keys(repair_data);
  var comment;
  repair.forEach((thing) => {
    if (repair_data[thing].comment) {
      comment = repair_data[thing].comment;
      console.log("comment", comment);
    }
  });
  return comment;
}

function makeBikeGrid(bikes_data) {
  let gallery = document.getElementById("gallery");
  let keys = Object.keys(bikes_data);
  let comment = "";

  keys.forEach((item) => {
    db.getRepairs(item)
      .then((data) => {
        if(prepRepairs(data) == undefined){
          comment = "";
        }else {
          comment = prepRepairs(data);
        }



        let bike_card = `\
          <div id="${bikes_data[item].bike_Id}" class="card">\
            <img class="card-img-top" src="http://via.placeholder.com/150x100" alt="Photo of your moped/scooter">\
            <div class="card-body">\
              <h5 class="card-title">"${bikes_data[item].nickname}"<br>${bikes_data[item].year} ${bikes_data[item].make} ${bikes_data[item].model}</h5>\
              <p style="font-weight: bold" class="card-text">Repair History</p>\
              <div class="list-group">\
                <p>${comment}</p>\
              </div>\
              <a href="#" class="btn btn-danger delete_bike">Delete</a>\
              <a href="#" class="btn btn-secondary edit_bike">Edit</a>\
              <a href="#" class="btn btn-dark service_bike">Request Service</a>\
            </div>\
          </div>`;
        gallery.innerHTML+= bike_card;
    });
  });
}

function showMyBikes(bikes_data) {
  console.log("This is what is passed from getBikes", bikes_data);
  main_content.innerHTML = `\
    <div class="main__container--service">\
      <div class="main__header">\
        <h3 class="main__heading">Hey ${user.getCompleteUser().name}. Here are your bikes.</h3>\
        <p class="main__subheading">You can additional bikes or request service for one already associated with your account.</p>\
        <button type="button" class="btn btn-dark" id="add_bike">+ Add bike</button>\
      </div>\
      <div id="gallery" class="main__supporting--service"></div>\
    </div>`;
  makeBikeGrid(bikes_data);
}

let showRequestBike = (bike) => {
  main_content.innerHTML = `
    <div class="main__container--service">
      <div class="main__header">
        <h3 class="main__heading">Need us to take a look at your ride?</h3>
        <p class="main__subheading">Fill out the information below and we can cook up a quote for you.</p>
      </div>
      <div id="gallery" class="main__supporting--service">
        <div id="single-bike"></div>
      </div>
    </div>`;

  let bike_card = `
    <div id="${bike.bike_Id}"class="card gallery__card--large">
      <h5 class="card-title">"${bike.nickname}" | ${bike.year} | ${bike.make} | ${bike.model}</h5>
      <img class="card-img-top" src="http://via.placeholder.com/300x200" alt="Photo of your moped/scooter">
      <div class="card-body" style="border: 1px solid rgba(0, 0, 0, .125); padding: 0 1rem 0 1rem; border-radius: .25rem;">
        <p class="card-text">Repair History</p>
        <div class="list-group">
          <a href="#" class="list-group-item">02/14/2018: Cleaned carberator, new chain, fixed signal</a>
        </div>
      </div>
    </div>`;
  let bikeDetails = document.getElementById("single-bike");
  bikeDetails.innerHTML = bike_card;
};


module.exports = {makeBikeGrid, showMyBikes, showRequestBike};
