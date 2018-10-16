"use strict";
let firebase = require('./fb-config'),
    provider = new firebase.auth.GoogleAuthProvider();

function logInGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

function logOut(){
  return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user){
	if (user){
        console.log("There is a user!");
		// currentUser = user;
		// makeCompleteUser(currentUser);
	}else{
		// currentUser = null;
	}
});

module.exports = {logInGoogle, logOut};