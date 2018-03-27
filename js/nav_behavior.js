"use strict";

function removeSelected() {
  let selected = document.getElementsByClassName('item_selected');
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.replace("item_selected", "lights");
  }
}

function navSelected(e) {
    removeSelected();
    let parentDiv = e.target.parentNode;
    if (parentDiv.classList.contains("lights") == true) {
      parentDiv.classList.replace("lights", "item_selected");
    }else if (parentDiv.classList.contains("lights") == false) {
      let lights = parentDiv.querySelector(".lights");
      lights.classList.replace("lights", "item_selected");
    }
}

module.exports = {navSelected};
