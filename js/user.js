"use strict";
let firebase = require("./fb-config"),
	provider = new firebase.auth.GoogleAuthProvider(),
	currentUser = null,
	completeUser = {
		fbID: null
	};

function makeCompleteUser(currentUser) {
	completeUser.name = currentUser.displayName;
	completeUser.email = currentUser.email;
	completeUser.uid = currentUser.uid;
}

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

function getCompleteUser() {
	return completeUser;
}

firebase.auth().onAuthStateChanged(function(user){
	// console.log("onAuthStateChanged", user);
	if (user){
		currentUser = user;
		makeCompleteUser(currentUser);
	}else{
		currentUser = null;
		// console.log("NO USER LOGGED IN");
	}
});

module.exports = {logInGoogle, logOut, getUser, setUserFbUglyId, getCompleteUser};
