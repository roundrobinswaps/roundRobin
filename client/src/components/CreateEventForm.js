import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import AlertMessage from "./AlertMessage";

const validate = values => {
  const errors = {}
  const requiredValues = ["eventName", "matchOptionId", "category", "matchOptionId"];
  requiredValues.forEach(required => {
  	if(!values[required] || values[required] == ""){
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

const renderToggle = (field) => {
	return (
	  <div>
      <label 
      	className="col-sm-4 text-right"
      >
        Public Event
        {" "}
      </label>
      <div className="col-sm-1">
			  <Toggle
					checked={field.input.value || false} 
					onChange={field.input.onChange} 
					icons={false} 
					className={field.input.className}
		    />
	    </div>
      <label 
      	className="col-sm-4 col-sm-offset-1"
      >
      	{" "}
        Private Event
      </label>
	  </div>
	);
};

const renderDropdown = (field) =>  {
  return(
   <div>
	    <select 
				{...field.input}
	  		className={field.className}
	    	type="select"
	  	>
	  		<option
	  			value=""
	  			key="0"
	  		>
	  			Select A Category
	  		</option>
	    	{	field.data.map(category =>
		      <option 
						value={category.id}
						key={category.id}
		      >
		        {category.categoryName}
		      </option>
			  )}
    	</select>
	    {field.meta.touched && (field.meta.error && <span className="error">{field.meta.error}</span>)}
  </div>
  );
};

const renderMatchOptions = (field) => {
	return(
     <div>
     		<select
					{...field.input}
		  		className={field.className}
		    	type="select"
     		>
					<option value="">Select An Option</option>
          <option
            value="1">
            Per Shipping Preferences Only
          </option>
          <option
            value="2">
            Totally Random
          </option>
     		</select>
		    {field.meta.touched && (field.meta.error && <span className="error">{field.meta.error}</span>)}
     </div>
 	);
};

let CreateEventForm = props => {
  const { handleSubmit, pristine, reset, submitting, eventName, organizerAka, aboutEvent } = props;
  return (
    <div className="panel">
      <div className="panel-heading eggshellBlue">
        <h3 className="panel-title">Create an Event</h3>
      </div>
      <div className="panel-body featherGrey">
			  <form 
			  	onSubmit={handleSubmit}
			  >
			  	<div className="form-horizontal">
					  <div className="form-group">
					    <label htmlFor="eventName" className="col-sm-2 control-label">Event Name</label>
			  	    <div className="col-sm-10">
					    	<Field
					    		name="eventName" 
					    		type="text"
        					component={renderField} 
					    		className="form-control"
				    		/>
					    </div>
					  </div>
					  <div className="form-group">  
					    <label htmlFor="organizerAka" className="col-sm-2 control-label">Group / Organizer Name</label>
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="organizerAka" 
        					component={renderField} 
					    		type="text" 
					    		className="form-control"
				    		/>
					    </div>
					    <label htmlFor="category" className="col-sm-2 control-label">Category:</label>	    
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="category" 
					    		component={renderDropdown}
					    		type="select" 
					    		className="form-control"
					    		data={props.options}
					    	>
					    	</Field>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="matchOptionId" className="col-sm-2 control-label">Allow Match Options:</label>	    
			  	    <div className="col-sm-4">
					    	<Field 
					    		name="matchOptionId" 
					    		component={renderMatchOptions} 
					    		type="select" 
					    		className="form-control"
				    		>
					    	</Field>
					    </div>

		          <div className="col-sm-6">
		            <Field 
		            	name="isPrivate" 
		            	component={renderToggle}
		            	className="form-control toggle-custom"
		            	data={true}
					    		type="custom"
	            	/>
            	</div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="aboutEvent" className="col-sm-2 control-label">About This Event</label>
			  	    <div className="col-sm-10">
					    	<Field 
					    		name="aboutEvent" 
        					component="textarea"
					    		type="textarea" 
					    		className="form-control "
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
				  			onDismiss={props.toggleIsShowingInfoAlert}
				  			dispatch={props.dispatch}
				  		/>
				  	</div>
					</div>
				</form>
			</div>
		</div>
)};


CreateEventForm = reduxForm({
  form: 'event',
  validate,
  enableReinitialize : true
})(CreateEventForm)

// Decorate with connect to read form values
const selector = formValueSelector('event') // <-- same as form name
CreateEventForm = connect(state => {
  const category = selector(state, 'category')
  const matchOptionId = selector(state, 'matchOptionId')
  const isPrivate = selector(state, 'isPrivate')
  const { eventName, organizerAka, aboutEvent} = selector(state, 'eventName', 'organizerAka', 'aboutEvent')
  return {
  	category,
  	matchOptionId,
  	isPrivate,
  	eventName,
  	organizerAka,
  	aboutEvent
  }
})(CreateEventForm)

export default CreateEventForm