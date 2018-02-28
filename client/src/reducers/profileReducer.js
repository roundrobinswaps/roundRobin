import { getUserData } from '../actions';

export const manageUserData = (state = { 
		firstName: "",
		lastName: "",
		aboutMe: "",
		streetAddress: "",
		city: "",
		email: "",
		postalCode: "",
		shippingPreferenceId: 1,
		stateProvince: "",
		country: ""
	}, action) => {
	switch(action.type){
		case "RECEIVE_PROFILEDATA":
			let newAction = action;
			if(action.shippingPreferenceId){
				newAction.shippingPreferenceId = parseInt(action.shippingPreferenceId);
			}
			if(action.streetAddress === "Please Confirm"){
				newAction.streetAddress = "";
			}
			if(action.postalCode === "Please Confirm"){
				newAction.postalCode = "";
			}
			if(action.city === "Please Confirm"){
				newAction.city = "";
				newAction.stateProvinceName = "";
				newAction.country = "";
			}else if(!action.stateProvince) {
				newAction.stateProvinceName = "";
				newAction.country = "";
			} else{
				let stateProvince = action.stateProvince['stateProvinceName'];
				let country = action.stateProvince['country'].countryName;
				newAction.stateProvinceName = stateProvince;
				newAction.country = country;
			}
			return{
				...state,
				...newAction
			}
		case "ERROR":
			return{
				...state,
				...action.data
			}
		default:
			return state
	}
}