import {SELECT_CATEGORY, REQUEST_DATA, RECEIVE_DATA, SELECT_MATCHOPTION, REGISTER_FORMDATA, CREATE_DATA, FORM_CLEAR, LOGIN, LOGOUT, REGISTER_PROFILEDATA, RECEIVE_PROFILEDATA, SUBMIT_PROFILEDATA, ERROR, TOGGLE_MODAL, TOGGLE_ALERT } from "./types.js";
import axios from "axios";
import moment from "moment";

export const selectCategory = category => {
	return{
		type: SELECT_CATEGORY,
		category
	};
};

const requestCategories = () => ({
	type: REQUEST_DATA,
	payload: "Requesting"
});

const recieveCategories = (json) => {
	let categoryArray = [];
	json.data.forEach(category => {
		categoryArray.push(category);
	});
	return {
		type: RECEIVE_DATA,
		categories: categoryArray
	};
};

export const fetchCategories = () => dispatch => {
	dispatch(requestCategories)
	const baseURL = "/api/events/categories/all";
	return axios.get(baseURL)
		.then(json => {
			dispatch(recieveCategories(json));
		});
};

const requestEvents = () => ({
	type: REQUEST_DATA,
	payload: "Requesting"
});

const receiveEvents = (json, setting) => {
	let eventArray = [];
	let signup;
	let shipping;
	if(json.data && json.data.length){
		json.data.forEach(event => {
			if(!event.organizerAka){
				event.organizer = event.user.firstName + " " + event.user.lastName;
			} else{
				event.organizer = event.organizerAka;
			}
			if(moment(event.signupDeadline).isValid()){
				signup = moment(event.signupDeadline).format("MM/DD/YYYY");
			} else{
				signup = "TBD";
			}
			if(moment(event.shipDeadline).isValid()){
				shipping = moment(event.shipDeadline).format("MM/DD/YYYY");			
			}else{
				shipping = "TBD";
			}
			event.signupDeadline = signup;
			event.shipDeadline = shipping;
			switch (setting){
				case "public":
					if(!event.isPrivate){
						eventArray.push(event);	
					}
					break;
				case "all":
					eventArray.push(event);	
				break;
			}
		});
	} else if (json.data){
		let event = json.data;
		if(!event.organizerAka){
			event.organizer = event.user.firstName + " " + event.user.lastName;
		} else{
			event.organizer = event.organizerAka;
		}
		if(moment(event.signupDeadline).isValid()){
			signup = moment(event.signupDeadline).format("MM/DD/YYYY");
		} else{
			signup = "TBD";
		}
		if(moment(event.shipDeadline).isValid()){
			shipping = moment(event.shipDeadline).format("MM/DD/YYYY");			
		}else{
			shipping = "TBD";
		}
		event.signupDeadline = signup;
		event.shipDeadline = shipping;
		switch (setting){
			case "public":
				if(!event.isPrivate){
					eventArray.push(event);	
				}
				break;
			case "all":
				eventArray.push(event);	
			break;
		}
	}
	return {
		type: RECEIVE_DATA,
		events: eventArray
	};	
};

export const searchEventsCategory = categoryId => dispatch => {
	dispatch(requestEvents)
	dispatch(selectCategory(0));
	const baseURL = `/api/events/options/categoryId&${categoryId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveEvents(json, "public"));
		});
};

export const searchEventsId = eventId => dispatch => {
	dispatch(clearFormData({
		eventId: ""
	}));
	dispatch(requestEvents)
	const baseURL = `/api/events/${eventId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveEvents(json, "all"));
		});
};

export const registerEventIdChange = data => {
	return {
		type: REGISTER_FORMDATA,
		eventId: data
	};
};

const receiveMyEvents = (json) => {
	let eventArray = [];
	let signup;
	let shipping;
	json.data.forEach(myevent => {
		if(!myevent.event.organizerAka){
			myevent.event.organizer = myevent.event.user.firstName + " " + myevent.event.user.lastName;
		} else{
			myevent.event.organizer = myevent.event.organizerAka;
		}
		if(moment(myevent.event.signupDeadline).isValid()){
			signup = moment(myevent.event.signupDeadline).format("MM/DD/YYYY");
		} else{
			signup = "TBD";
		}
		if(moment(myevent.event.shipDeadline).isValid()){
			shipping = moment(myevent.event.shipDeadline).format("MM/DD/YYYY");			
		}else{
			shipping = "TBD";
		}
		myevent.event.signupDeadline = signup;
		myevent.event.shipDeadline = shipping;
		eventArray.push(myevent);
	});
	return {
		type: RECEIVE_DATA,
		myEvents: eventArray
	};	
};

export const fetchMyEvents = userId => dispatch => {
	dispatch(requestEvents);
	const baseURL = `/api/events/user/${userId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveMyEvents(json));
		});
};

const receiveMyManagedEvents = (json) => {
	let eventArray = [];
	let signup;
	let shipping;
	if(json.data){
		json.data.forEach(myevent => {
			if(moment(myevent.signupDeadline).isValid()){
				signup = moment(myevent.signupDeadline).format("MM/DD/YYYY");
			} else{
				signup = "TBD";
			}
			if(moment(myevent.shipDeadline).isValid()){
				shipping = moment(myevent.shipDeadline).format("MM/DD/YYYY");			
			}else{
				shipping = "TBD";
			}
			myevent.signupDeadline = signup;
			myevent.shipDeadline = shipping;
			eventArray.push(myevent);
		});
	}
	return {
		type: RECEIVE_DATA,
		myManagedEvents: eventArray
	};	
};

export const fetchMyManagedEvents = userId => dispatch => {
	dispatch(requestEvents);
	const baseURL = `/api/events/options/userId&${userId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveMyManagedEvents(json));
		});
};

export const selectMatchOptions = option => {
	return{
		type: SELECT_MATCHOPTION,
		option
	};
};

export const registerEventNameChange = data => {
	return {
		type: REGISTER_FORMDATA,
		eventName: data
	};
};

export const registerOrganizerAkaChange = data => {
	return {
		type: REGISTER_FORMDATA,
		organizerAka: data
	};
};

export const registerAboutEventChange = data => {
	return {
		type: REGISTER_FORMDATA,
		aboutEvent: data
	};
};

export const registerRadioButtonChange = data => {
	return {
		type: REGISTER_FORMDATA,
		isPrivate: data
	};
};

export const registerAllEventData = data => {
	return {
		type: REGISTER_FORMDATA,
		...data
	}
}

const clearFormData = data => {
	return {
		type: FORM_CLEAR,
		...data
	}
}

export const submitNewEvent = eventData => dispatch => {
/*	dispatch(clearFormData({
		eventName: "",
		organizerAka: "",
		aboutEvent: "",
		isPrivate: ""
	}));
	dispatch (selectCategory(1));
	dispatch(selectMatchOptions(1));
	*/
	dispatch(toggleIsShowingInfoAlert(true));
	const baseURL = `/api/events`;
	return axios.post(baseURL, eventData)
		.then(json => {
			dispatch(fetchMyManagedEvents(eventData.userId));
		});
};

export const joinEvent = eventData => dispatch => {
	dispatch(toggleIsShowingInfoAlert(true));
	const baseURL = `/api/events/join/${eventData.eventId}&${eventData.userId}`;
	return axios.post(baseURL)
	.then(json => {
			dispatch(fetchMyEvents(eventData.userId));
	});
};

const logUserIn = (authObj, json) => {
	console.log("logUserIn");
	let login = {
		loginStatus: authObj.status,
		access_token: authObj.authResponse.accessToken,
		fbUserId: authObj.authResponse.userID,
		dbStatus: json.statusText,
	};
	if (json.data){
		login.userId = json.data.id;
		login.firstName = json.data.firstName;
		login.lastName = json.data.lastName;
	} else{
		login.userId = 0;
	}
	if(login.loginStatus == "connected" && login.dbStatus == "OK"){
		return {
			type: LOGIN,
			data: login
		};
	} else{
		return {
			type: LOGOUT,
			data: login
		};
	}
};

export const loginToDb = (authObj) => dispatch => {
	console.log("loginToDb");
//	const baseURL = `/auth/facebook/token?access_token=${authObj.authResponse.accessToken}`;
	const baseURL = `/auth/facebook/token`;
	return axios.post(baseURL, {
		access_token: authObj.authResponse.accessToken
	})
	.then(json => {
		dispatch(logUserIn(authObj, json));
	})
	.catch(err => {
		console.log("Error: ");
		console.log(err.message);
		dispatch(logUserIn(authObj, err));
	});
};

export const isLoggedIn = () => dispatch => {
	const baseURL = `/login`;
	return axios.get(baseURL)
	.then(json => {
		console.log("isLoggedIn");
	});
}

export const receiveFbData = fbData => dispatch => {
//	console.log(fbData);
};

const receiveUserData = (json) => {
	return {
		type: RECEIVE_PROFILEDATA,
		...json
	}
};

export const getUserData = userId => dispatch => {
	const baseURL = `/api/users/${userId}`;
	return axios.get(baseURL)
	.then(json => {
		dispatch(receiveUserData(json.data));
	})
};

const submitError = (errJson) => {
	return {
		type: ERROR,
		...errJson
	};
};

export const submitUserData = (userId, userData) => dispatch => {
	const baseURL = `/api/users/${userId}`;
	return axios.put(baseURL, userData)
	.then(json => {
		if(json.status === 200){
			dispatch(toggleIsShowingInfoAlert(true));
			dispatch(getUserData(userId));
		} else{
			dispatch(submitError(json));
		}
	})
};

export const	toggleModal = (label) => {
  return {
    type: TOGGLE_MODAL,
    id: label
  };
};

export const matchAction = (args) => dispatch => {
	const baseURL = `/api/events/match/${args.id}`;
	return axios.put(baseURL, {})
	.then(json => {
		dispatch(fetchMyManagedEvents(args.userId))
	})
};

export const toggleIsShowingInfoAlert = (show) => {
	return {
		type: TOGGLE_ALERT,
		showInfo: show
	}
}
