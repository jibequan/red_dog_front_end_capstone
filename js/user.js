"use strict";

let currentUser = null,
		completeUser = {
		fbID: null
};

function makeCompleteUser(currentUser) {
	completeUser.name = currentUser.displayName;
	completeUser.email = currentUser.email;
	completeUser.uid = currentUser.uid;
}

function setUserFbUglyId(fUglyID) {
	completeUser.fbID = fUglyID;
}

function getCompleteUser() {
	return completeUser;
}

module.exports = {setUserFbUglyId, getCompleteUser};
