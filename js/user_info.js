"use strict";

let main_content = document.getElementById("main_content");

function makeBikeGrid() {
  document.getElementById("gallery").innerHTML = `<div class="card col-sm-6">
  <img class="card-img-top" src="images/ShredPed1.0.jpg" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-danger">Delete</a>
    <a href="#" class="btn btn-secondary">Edit</a>
    <a href="#" class="btn btn-dark">Request Service</a>
  </div>
</div>`;
}

module.exports = {makeBikeGrid};
