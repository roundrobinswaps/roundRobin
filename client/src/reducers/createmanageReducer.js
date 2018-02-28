import { fetchMyManagedEvents, selectMatchOptions, registerEventNameChange, registerRadioButtonChange, submitNewEvent } from '../actions';

export const manageMyEvents = (state = { 
		isFetching: false, 
		myManagedEvents: [],
		user: 1, 
		matchOption: 1
	}, action) => {
	switch(action.type){
		case "REQUEST_DATA":
			return{
				...state,
				isFetching: true
			}
		case "RECEIVE_DATA":
			let newState = {
				...state,
				isFetching: false
			};
			if(action.myManagedEvents){
				newState.myManagedEvents = action.myManagedEvents;
			}
			return newState;
		default:
			return state
	}
}

export const selectMatchOption = (state={
	isFetching: false, 
	myManagedEvents: [],
	user: 1,
	matchOption: 1
}, action) => {
	switch(action.type){
		case "SELECT_MATCHOPTION":
			return {
				...state,
				matchOption: action.option
			}
		default:
			return state
	}
}

export const registerFormData = (state={
	eventName: "",
	organizerAka: "",
	isPrivate: false
}, action) =>{
	let newState = {};
	switch(action.type){
		case "REGISTER_FORMDATA":
			newState = {
				...state,
			};
			if(action.eventName){
				newState.eventName = action.eventName;
			}
			if(action.organizerAka){
				newState.organizerAka = action.organizerAka;
			}
			if(action.aboutEvent){
				newState.aboutEvent = action.aboutEvent;
			}
			if(action.isPrivate){
				newState.isPrivate = action.isPrivate;
			}
			if(action.eventId){
				newState.eventId = action.eventId;
			}
			return newState;
		case "FORM_CLEAR":
			newState =  {
				...state,
				...action
			}
			return newState
		default:
			return state;
	}
}