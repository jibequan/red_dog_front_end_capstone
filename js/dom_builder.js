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

function showMyBikes(bikes_data, user) {
  contentToDom(content.myBikes(user));
  if (!bikes_data) {

  }else {
    makeBikeGrid(bikes_data);
  }
}

let showRequestBike = (bike) => {  
  contentToDom(content.requestService);
  let bikeDetails = document.getElementById("single-bike");
  bikeDetails.innerHTML = content.largeCard(bike);
};

module.exports = {contentToDom, makeBikeGrid, showMyBikes, showRequestBike};
