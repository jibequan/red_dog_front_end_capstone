"use strict";

let $ = require("jquery");

let contentToDom = (content) => {
  let main_content = document.getElementById("main_content");
  main_content.innerHTML = content;
};

module.exports = {contentToDom};
