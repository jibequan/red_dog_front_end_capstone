"use strict";

let currentUser = null,
		completeUser = {
		fbID: null
};

function setUserFbUglyId(fUglyID) {
	completeUser.fbID = fUglyID;
}

function getCompleteUser() {
	return completeUser;
}

module.exports = {setUserFbUglyId, getCompleteUser};
