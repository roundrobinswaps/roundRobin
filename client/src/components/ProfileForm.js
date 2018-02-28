import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {getUserData} from "../actions";
import AlertMessage from "./AlertMessage";

const validate = values => {
  const errors = {}
  const requiredValues = ["firstName", "lastName", "email", "streetAddress", "city", "postalCode", "country", "stateProvinceName"];
  requiredValues.forEach(required => {
  	if(!values[required] || values[required] === ""){
  		errors[required] = "Required";
  	}
  })
  return errors
};

const renderField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
  <div>
    <input 
    	{...input} 
    	type={type} 
    	className={className}
  	/>
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const renderTextArea = (field) => (
  <div>
    <textArea 
    	{...field.input} 
    	type={field.type} 
    	className={field.className}
  	/>
    {field.meta.touched && (field.meta.error && <span className="error">{field.meta.error}</span>)}
  </div>
);

const renderCountryList = (field) => {
	return (
	  <div>
	  	<CountryDropdown 
				{...field.input}
	  		classes={field.className}				
			/>
	    {field.meta.touched && (field.meta.error && <span className="error">{field.meta.error}</span>)}
		</div>
)};

const renderStateProvinceList = (field) => {
	return(
  	<div>
			<RegionDropdown 
				{...field.input}
	  		classes="form-control"
	  		country={field.data}				
			/>
	    {field.meta.touched && (field.meta.error && <span className="error">{field.meta.error}</span>)}
		</div>
)};

let ProfileForm = props => {
  const { handleSubmit, country, stateProvince, shippingPref, firstName, lastName, email, address, city, postalCode, aboutMe, getUserData, pristine, reset, submitting, toggleIsShowingInfoAlert } = props;

  return (
    <div className="panel">
      <div className="panel-heading eggshellBlue">
        <h3 className="panel-title">My Profile</h3>
      </div>
      <div className="panel-body featherGrey">
			  <form 
			  	onSubmit={handleSubmit}
			  >
			  	<div className="form-horizontal">
					  <div className="form-group">
					    <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
			  	    <div className="col-sm-4">
					    	<Field
					    		name="firstName" 
					    		type="text"
        					component={renderField} 
					    		className="form-control"
				    		/>
					    </div>
					    <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="lastName" 
        					component={renderField} 
					    		type="text" 
					    		className="form-control"
				    		/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="email" 
        					component={renderField} 
					    		type="email" 
					    		className="form-control"
				    		/>
					    </div>
					    <label htmlFor="shippingPreferenceId" className="col-sm-2 control-label">Shipping Preferences</label>	    
			  	    <div className="col-sm-4">
					    	<Field name="shippingPreferenceId" component="select" type="select" className="form-control">
									<option value="">Select an option...</option>
									<option value="1">My Country Only</option>
									<option value="2">Worldwide</option>
					    	</Field>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="streetAddress" className="col-sm-2 control-label">Address</label>
			  	    <div className="col-sm-10">
					    	<Field 
					    		name="streetAddress" 
        					component={renderField} 
				    			type="text" 
				    			className="form-control"
			    			/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="city" className="col-sm-2 control-label">City</label>
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="city" 
        					component={renderField} 
					    		type="text" 
					    		className="form-control"
				    		/>
					    </div>
					    <label htmlFor="postalCode" className="col-sm-2 control-label">Zip/Postal Code</label>
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="postalCode" 
        					component={renderField} 
					    		type="text" 
					    		className="form-control"
				    		/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="country" className="col-sm-2 control-label">Country</label>
			  	    <div className="col-sm-4">
					    	<Field
					    		name="country" 
					    		component={renderCountryList} 
					    		className="form-control"
					    		type="custom"
				    		/>
					    </div>
					    <label htmlFor="stateProvinceName" className="col-sm-2 control-label">State/Province</label>
			  	    <div className="col-sm-4">
					    	<Field
					    		name="stateProvinceName" 
					    		component={renderStateProvinceList} 
					    		data={country}
					    		flat
				    		/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="aboutMe" className="col-sm-2 control-label">About Me</label>
			  	    <div className="col-sm-10">
					    	<Field 
					    		name="aboutMe" 
        					component="textarea" 
					    		type="textarea" 
					    		className="form-control textarea"
				    		/>
					    </div>
					  </div>
					  <div className="form-group">
              <div className="col-sm-offset-10 col-sm-3">
				  			<button type="submit" className="btn btn-success">Submit</button>
				  		</div>
				  		<AlertMessage 
				  			type="success"
				  			message="Submitted!"
				  			position="bottom-right"
				  			isShowingInfoAlert={props.isShowingInfoAlert}
				  			onDismiss={toggleIsShowingInfoAlert}
				  			dispatch={props.dispatch}
				  		/>
				  	</div>
					</div>
				</form>
			</div>
		</div>
)};


ProfileForm = reduxForm({
  form: 'profile',
  validate,
  enableReinitialize : true
})(ProfileForm)

// Decorate with connect to read form values
const selector = formValueSelector('profile') // <-- same as form name
ProfileForm = connect(state => {
  const shippingPreferenceId = selector(state, 'shippingPreferenceId')
  const country = selector(state, 'country')
  const stateProvinceName = selector(state, 'stateProvinceName')
  const { firstName, lastName, email, streetAddress, city, postalCode, aboutMe } = selector(state, 'firstName', 'lastName', 'email', 'streetAddress', 'city', 'postalCode', 'aboutMe')
  return {
  	shippingPreferenceId,
  	country,
  	stateProvinceName,
  	firstName,
  	lastName,
  	email,
  	streetAddress,
  	city,
  	postalCode,
  	aboutMe
  }
})(ProfileForm)

// You have to connect() to any reducers that you wish to connect to yourself
ProfileForm = connect(
  state => ({
    initialValues: state.manageUserData // pull initial values from account reducer
  }),
  { load: getUserData } // bind account loading action creator
)(ProfileForm)

export default ProfileForm