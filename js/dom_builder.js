"use strict";

let content = require('./content');

let contentToDom = (content) => {
  let main_content = document.getElementById("main_content");
  main_content.innerHTML = content;
};


function makeBikeGrid(bikes_data) {
  let gallery = document.getElementById("gallery");
  let keys = (Object.keys(bikes_data));

  keys.forEach((item) => {
    var card = content.smallCard(bikes_data[item]);
    gallery.innerHTML += card;
  });
}

function makeBikeDetails(bike_data) {
  let container = document.getElementById("bikeDetails");
  let keys = (Object.keys(bike_data));

  keys.forEach((item) => {
    var card = content.largeCard(bike_data[item]);
    container.innerHTML = card;
  });
}

function showMyBikes(bikes_data, user) {
  contentToDom(content.myBikes(user));
  if (!bikes_data) {

  }else {
    makeBikeGrid(bikes_data);
  }
}

let showRequestBike = (bike) => {  
  contentToDom(content.requestService);
  let container = document.getElementById("container__supporting");
  container.innerHTML = content.largeCard(bike);
};

module.exports = {
  contentToDom,
  makeBikeGrid,
  makeBikeDetails,
  showMyBikes,
  showRequestBike
};
