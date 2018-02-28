import { loginToDb } from '../actions';

export const loginReducer = (state = { 
	loginStatus: "not connected",
	access_token: "",
	fbUserId: "",
	dbStatus: "", 
	userId: 0
	}, action) => {
	switch(action.type){
		case "LOGIN":
			console.log("LOGIN");
			return {
				...state,
				...action.data,
				loggedIn: true
			}
		case "LOGOUT":
			console.log("LOGOUT");
			return {
				...state,
				...action.data,
				loggedIn: false
			};
		default:
			return state
	}
};