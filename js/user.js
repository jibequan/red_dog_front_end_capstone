"use strict";
let firebase = require("./fb-config"),
	provider = new firebase.auth.GoogleAuthProvider(),
	currentUser = null,
	completeUser = null;


function logInGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

function logOut(){
  return firebase.auth().signOut();
}

function getUser() {
  return currentUser;
}

function setUserFbUglyId(fUglyID) {
	completeUser.fbID = fUglyID;
}

function getUserFbUglyId() {
	return completeUser.fbID;
}

firebase.auth().onAuthStateChanged(function(user){
	console.log("onAuthStateChanged", user);
	if (user){
		currentUser = user;
	}else{
		currentUser = null;
		console.log("NO USER LOGGED IN");
	}
});

module.exports = {logInGoogle, logOut, getUser, setUserFbUglyId, getUserFbUglyId};
