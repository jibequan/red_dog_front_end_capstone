"use strict";

function showForm(){
  let main_area = document.getElementById("main_content");
  main_area.innerHTML =
  `<form>
      <fieldset>
        <legend>Contact Information</legend>
<!-- First and Last Name -->
            <div class="form-row">
              <div class="col">
                <label for="contact-first-name">First Name</label>
                <input id="contact-first-name" class="form-control" type="text" placeholder="First Name" required>
              </div>
              <div class="col">
                  <label for="contact-last-name">Last Name</label>
                  <input id="contact-last-name" class="form-control" type="text" placeholder="Last Name" required>
              </div>
            </div>
<!-- Phone Number -->
            <div class="form-row">
              <div class="col-sm-3">
                <label for="contact-area-code">Area Code</label>
                <input id="contact-area-code" class="form-control" type="number" placeholder="Area Code" required>
              </div>
              <div class="col">
                <label for="contact-m-number">Phone Number</label>
                <input id="contact-m-number" class="form-control" type="number" placeholder="Telephone Number" required>
              </div>
            </div>
<!-- Email Address -->
            <div class="form-group">
              <label for="contact-email">Email Address</label>
              <input id="contact-email" class="form-control" type="email" placeholder="Email address">
            </div>
<!-- First Line of Address -->
            <div class="form-group">
              <label for="contact-address">Street Address</label>
              <input id="contact-address" class="form-control" type="address" placeholder="Street Address" required>
            </div>
<!-- Second Line of Address -->
            <div class="form-group">
              <label for="contact-sec-address">Apt., Suite, Building, etc.</label>
              <input id="contact-sec-address" class="form-control" type="address" placeholder="Apt., Suite, Building, etc.">
            </div>
<!-- State or Province -->
            <div class="form-row">
              <div class="col">
                <label for="contact-state">State or Province</label>
                <input id="contact-state" class="form-control" type="address" placeholder="State or Province">
              </div>
<!-- Postal Code -->
              <div class="col">
                <label for="contact-postal">ZIP or Postal Code</label>
                <input id="contact-postal" class="form-control" type="address" placeholder="ZIP or Postal Code" required>
              </div>
            </div>
      </fieldset>
        <hr>
      <fieldset>
        <legend>Bike Information</legend>
            <div class="form-group">
              <label for="bike-nickname">Nickname</label>
              <input id="bike-nickname" class="form-control" type="text" placeholder="Nickname">
            </div>
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">Upload image of your bike</label>
              <input type="file" class="custom-file-input" id="customFile">
            </div>
            <div class="form-group">
                <label for="bike-year">Year</label>
                <input id="bike-year" class="form-control" type="text" placeholder="Year">
            </div>
            <div class="form-group">
              <label for="bike-make">Make</label>
              <input id="bike-make" class="form-control" type="text" placeholder="Make">
            </div>
            <div class="form-group">
              <label for="bike-model">Model</label>
              <input id="bike-model" class="form-control" type="text" placeholder="Model">
            </div>
            <div class="form-group">
              <label for="bike-comments">Comments</label>
              <textarea id="bike-comments" class="form-control" rows="3" placeholder="Comments"></textarea>
            </div>
        </fieldset>
        <!-- Add Bike/Submit Button -->
          <button type="submit" class="btn btn-danger" value="CANCEL">Cancel</button>
          <button type="submit" class="btn btn-dark" value="ADD BIKE">Add Bike</button>          
      </form>`;
}

module.exports = {showForm};
