import React from "react";
import ReactDOM from "react-dom";
import { Alert, AlertContainer } from "react-bs-notifier";
 
const AlertMessage = props => {
	return(
	  <AlertContainer
	  	position={props.position}
	  >     
			{props.isShowingInfoAlert ? (					
				<Alert 
		    	type={props.type} 
		    	headline={props.headline}
		    	timeout={3000}
		    	onDismiss={props.onDismiss}
	    	>
		    	{props.message}
		    </Alert>
			) : null} 
    </AlertContainer>
  );
}

export default AlertMessage;