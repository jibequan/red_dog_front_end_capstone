"use strict";

let user = require("./user");

let currentUser = user.getCompleteUser();

const addBikeForm = `\
                    <div class="main__container--service">\
                      <div class="main__header">\
                        <h3 class="main__heading">Add A Bike to Your Account</h3>\
                        <p class="main__subheading">New ride? Sweet! Just add it in here to make service simple should you ever need it.</p>\
                      </div>
                        <div class="main__supporting--service">\
                          <a class="main__supporting-placeholder"href="https://placeholder.com"><img src="http://via.placeholder.com/300x150"></a>
                          <form class="form__add-form">
                            <fieldset>
                              <legend>Bike Information</legend>
                                  <div class="form-group">
                                    <label for="bike-nickname">Nickname</label>
                                    <input id="bike-nickname" class="form-control" type="text" placeholder="Nickname">
                                  </div>
                                  <div class="custom-file">
                                    <label class="custom-file-label" for="customFile">Choose file</label>
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
                              <div class="row justify-content-end form__button-row">
                                <button class="btn btn-danger form__button--margin" type="button" value="CANCEL">Cancel</button>
                                <button id="save_bike" class="btn btn-dark" type="button" value="ADD BIKE">Add Bike</button>
                              </div>
                          </form>
                        </div>
                      </div>`;

const guestForm = `<div class="main__container--service">
      <div class="main__header">
        <h3 class="main__heading">Setup Service for your bike</h3>
        <p class="main__subheading">Just provide us with your contact information and some for your bike and we'll get things going.</p>
        
      </div>
    <form class="form__guest-form">
      <fieldset>
        <legend>Contact Information</legend>
        <!-- First and Last Name -->
          <div class="form-row">
            <div class="form-group col">
              <label for="contact-first-name">First Name</label>
              <input id="contact-first-name" class="form-control" type="text" placeholder="First Name" required>
            </div>
            <div class="form-group col">
              <label for="contact-last-name">Last Name</label>
              <input id="contact-last-name" class="form-control" type="text" placeholder="Last Name" required>
            </div>
          </div>

        <!-- Phone Number -->
          <div class="form-row">
            <div class="form-group col-4">
              <label for="contact-area-code">Area Code</label>
              <input id="contact-area-code" class="form-control" type="text" placeholder="Area Code" required>
            </div>
            <div class="form-group col-8">
              <label for="contact-m-number">Phone Number</label>
              <input id="contact-m-number" class="form-control" type="text" placeholder="Telephone Number" required>
            </div>
          </div>

        <!-- Email Address -->
          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input id="contact-email" class="form-control" type="email" placeholder="Email address" required>
          </div>

        <!-- First Line of Address -->
          <div class="form-group">
            <label for="contact-address">Street Address</label>
            <input id="contact-address" class="form-control" type="address" placeholder="Street Address">
          </div>

        <!-- Second Line of Address -->
          <div class="form-group">
            <label for="contact-sec-address">Apt., Suite, Building, etc.</label>
            <input id="contact-sec-address" class="form-control" type="address" placeholder="Apt., Suite, Building, etc.">
          </div>

        <!-- City and State-->
          <div class="form-row">
            <div class="form-group col-6">
              <label for="contact-city">City</label>
              <input id="contact-city" class="form-control" type="address" placeholder="City">
            </div>
            <div class="form-group col-6">
              <label for="contact-state">State or Province</label>
              <input id="contact-state" class="form-control" type="address" placeholder="State or Province">
            </div>
          </div>

        <!-- Postal Code -->
          <div class="form-row">
            <div class="form-group col-6">
              <label for="contact-postal">ZIP or Postal Code</label>
              <input id="contact-postal" class="form-control" type="address" placeholder="ZIP or Postal Code">
            </div>
          </div>
      </fieldset>

      <hr>

      <fieldset>
        <legend>Bike Information</legend>
          <div class="form-row">
            <div class="form-group col-4">
                <label for="bike-year">Year</label>
                <input id="bike-year" class="form-control" type="text" placeholder="Year">
            </div>
            <div class="form-group col-4">
              <label for="bike-make">Make</label>
              <input id="bike-make" class="form-control" type="text" placeholder="Make">
            </div>
            <div class="form-group col-4">
              <label for="bike-model">Model</label>
              <input id="bike-model" class="form-control" type="text" placeholder="Model">
            </div>
            <div class="form-group col-12">
              <label for="bike-comments">What's the issue?</label>
              <textarea id="bike-comments" class="form-control" rows="3" placeholder=""></textarea>
            </div>
          </div>
      </fieldset>
    <!-- Add Bike/Submit Button -->
      <div class="row justify-content-end form__button-row">
        <button type="button" class="btn btn-danger form__button--margin" value="CANCEL">Cancel</button>
        <button type="button" class="btn btn-dark guest_submit_repair">Submit</button>
      </div>
    </form>
  </div>`;

const timeForm = `<h3>Nickname | Year | Make | Model</h3>
  <div class="col-sm-6">
    <img src="images/1976-yellow-puch-maxi-13.jpg" alt="1976 Yellow Puch Maxi" class="img-fluid">
  </div>
  <div class="dropdown col-sm-6">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Dropoff</a>
      <a class="dropdown-item" href="#">Pickup</a>
    </div>
  </div>`;

const editBikeForm = `\
  <div class="main__container--service">\
    <div class="main__header">\
      <h3 class="main__heading">Update the Info Associated with your Bike.</h3>\
      <p class="main__subheading">Just change what you like.</p>\
    </div>\
    <div class="main__supporting--service">
      <form class="form__edit-form">
        <fieldset>
          <legend>Bike Information</legend>
            <div class="form-group">
              <label for="bike-nickname">Nickname</label>
              <input id="bike-nickname" class="form-control" type="text" placeholder="">
            </div>
            <div class="form-group custom-file">
              <label class="custom-file-label" for="customFile">Choose Image</label>
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
        </fieldset>
          <!-- Add Bike/Submit Button -->
          <div class="form__button-row">
            <button type="button" class="btn btn-danger form__button--margin" id="cancel_changes" value="Cancel">Cancel</button>
            <button type="button" class="btn btn-dark" id="save_changes" value="Save Changes">Save Changes</button>
          </div>
      </form>
    </div>
  </div>`;

let requestServiceForm = () => {
  let gallery = document.getElementById("gallery");
  gallery.innerHTML += `
        <form class="form__service-form">
          <fieldset>
            <legend>Contact Information</legend>
      <!-- First and Last Name -->
              <div class="form-group">
                <label for="contact-first-name">Name</label>
                <input id="contact-first-name" class="form-control" type="text" placeholder="${user.getCompleteUser().name}" required>
              </div>
      <!-- Phone Number -->
              <div class="form-row">
                <div class="form-group col-4">
                  <label for="contact-area-code">Area Code</label>
                  <input id="contact-area-code" class="form-control" type="text" placeholder="Area Code" required>
                </div>
                <div class="form-group col-8">
                  <label for="contact-m-number">Phone Number</label>
                  <input id="contact-m-number" class="form-control" type="text" placeholder="Telephone Number" required>
                </div>
              </div>
      <!-- Email Address -->
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input id="contact-email" class="form-control" type="email" placeholder="${user.getCompleteUser().email}" required>
              </div>
      <!-- First Line of Address -->
              <div class="form-group">
                <label for="contact-address">Street Address</label>
                <input id="contact-address" class="form-control" type="address" placeholder="Street Address">
              </div>
      <!-- Second Line of Address -->
              <div class="form-group">
                <label for="contact-sec-address">Apt., Suite, Building, etc.</label>
                <input id="contact-sec-address" class="form-control" type="address" placeholder="Apt., Suite, Building, etc.">
              </div>
      <!-- State or Province -->
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="contact-city">City</label>
                  <input id="contact-city" class="form-control" type="address" placeholder="City">
                </div>
                <div class="form-group col-6">
                  <label for="contact-state">State or Province</label>
                  <input id="contact-state" class="form-control" type="address" placeholder="State or Province">
                </div>
              </div>
    <!-- Postal Code -->
              <div class="form-group">
                  <label for="contact-postal">ZIP or Postal Code</label>
                  <input id="contact-postal" class="form-control" type="address" placeholder="ZIP or Postal Code">
              </div>
    <!-- Comments -->
              <div class="form-group">
                <label for="bike-comments">Comments</label>
                <textarea id="bike-comments" class="form-control" rows="3" placeholder="What's the issue?"></textarea>
              </div>
          </fieldset>
    <!-- Add Bike/Submit Button -->
          <div class="row justify-content-end form__button-row">
            <button type="button" class="btn btn-danger form__button--margin cancel">Cancel</button>
            <button type="button" class="btn btn-dark submit_repair">Submit</button>
          </div>
        </form>`;
};

module.exports = {guestForm, addBikeForm, timeForm, editBikeForm, requestServiceForm};
