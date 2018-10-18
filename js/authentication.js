"use strict";
let firebase = require('./fb-config');

let provider = new firebase.auth.GoogleAuthProvider();

function logInGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

function logOut(){
  return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user){
	if (user){
		console.log("There is a user!");
	}else{
		console.log("No user yet!");
	}
});

module.exports = {logInGoogle, logOut};