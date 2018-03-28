"use strict";

let forms = require("./forms"),
    user= require("./user");


let main_content = document.getElementById("main_content");

function makeBikeGrid(bikes_data) {
  for (let bike in bikes_data) {
  document.getElementById("gallery").innerHTML = `<div class="card col-sm-6">
    <img class="card-img-top" src="${bike.photo}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">"${bike.nickname}" | ${bike.year} | ${bike.make} | ${bike.model}</h5>
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
}

function showMyBikes(bikes_data) {
  console.log("Did you get here?");
  main_content.innerHTML = `<h3>Hey ${user.getCompleteUser().displayName}. Here are your bikes.</h3>
  <p class="subheading">You can additional bikes or request service for one already associated with your account.</p>
  <button type="button" class="btn btn-dark" id="add_bike">+ Add bike</button>
  <div id="gallery" class="row"></div>`;
  makeBikeGrid(bikes_data);
  let addBike = document.getElementById("add_bike");
  addBike.addEventListener("click", ()=>{
    forms.showBikeForm();
  });
}

module.exports = {showMyBikes};
