"use strict";

function showForm(){
  let main_area = document.getElementById("main_content");
  main_area.innerHTML =
  `<form>
      <fieldset>
        <legend>Contact Information</legend>
<!-- First and Last Name -->
            <div class="form-group">
                <label for="contact-first-name">First Name</label>
                <input id="contact-first-name" class="form-control" type="text" placeholder="First Name" required>
            </div>
            <div class="form-group">
                <label for="contact-last-name"></label>
                <input id="contact-last-name" class="form-control" type="text" placeholder="Last Name" required>
            </div>
<!-- Phone Number -->
            <div class="form-group">
              <label for="contact-area-code"></label>
              <input id="contact-area-code" class="form-control" type="number" placeholder="Area Code" required>
            </div>
            <div class="form-group">
              <label for="contact-m-number"></label>
              <input id="contact-m-number" class="form-control" type="number" placeholder="Telephone Number" required>
            </div>
<!-- Email Address -->
            <div class="form-group">
              <label for="contact-email"></label>
              <input id="contact-email" class="form-control" type="email" placeholder="Email address">
            </div>
<!-- First Line of Address -->
            <div class="form-group">
              <label for="contact-address"></label>
              <input id="contact-address" class="form-control" type="address" placeholder="Street Address" required>
            </div>
<!-- Second Line of Address -->
            <div class="form-group">
              <label for="contact-sec-address"></label>
              <input id="contact-sec-address" class="form-control" type="address" placeholder="Apt., Suite, Building, etc.">
            </div>
<!-- State or Province -->
            <div class="form-group">
              <label for="contact-state"></label>
              <input id="contact-state" class="form-control" type="address" placeholder="State or Province">
<!-- Postal Code -->
            </div class="form-group">
              <label for="contact-postal"></label>
              <input id="contact-postal" class="form-control" type="text" placeholder="Postal Code" required>
            </div>
      </fieldset>
        <hr>
      <fieldset>
        <legend>Bike Information</legend>
            <div class="form-group">
              <label for="bike-nickname"></label>
              <input id="bike-nickname" class="form-control" type="text" placeholder="Nickname">
            </div>
            <div class="form-group">
                <label for="bike-year"></label>
                <input id="bike-year" class="form-control" type="text" placeholder="Year">
            </div>
            <div class="form-group">
              <label for="bike-make"></label>
              <input id="bike-make" class="form-control" type="text" placeholder="Make">
            </div>
            <div class="form-group">
              <label for="bike-model"></label>
              <input id="bike-model" class="form-control" type="text" placeholder="Model">
            </div>
            <div class="form-group">
              <label for="bike-comments"></label>
              <textarea id="bike-comments" class="form-control" rows="3" placeholder="Comments"></textarea>
        </fieldset>
        <hr>
        <!-- Add Bike/Submit Button -->
        <span>
          <label for="p-submit"></label>
          <input id="p-submit" type="button" class="btn btn-dark" value="ADD BIKE">
        </span>
      </form>`;
}

module.exports = {showForm};
