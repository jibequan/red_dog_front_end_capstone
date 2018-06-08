"use strict";

function removeSelected() {
  let nav__items = document.getElementById("nav__list").children;
  for (let item of nav__items) {
    for (let child of item.children) {
      if (child.className === "nav__item-light--selected") {
        child.className = "nav__item-light";
      }
    }
  }
}

function navSelected(e) {
    removeSelected();
    let parts = e.currentTarget.children;
    for (var i = 1; i < parts.length; i++) {
      parts[i].classList.replace("nav__item-light", "nav__item-light--selected");
    }
}

module.exports = {navSelected};
