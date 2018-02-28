import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Home extends Component {

	render() {
    const { isFetching, myManagedEvents, user, categories, category, matchOption, eventName, organizerAka, aboutEvent, isPrivate, isLoggedIn, loginStatus, firstName, lastName } = this.props
    let data;
    if (!isLoggedIn){
		  data = <h3 className="text-center">Log in with Facebook to Get Started!</h3>
    } else{
    	data = <h3 className="text-center">Thanks for logging in, {firstName} {lastName}!</h3>
    }
		return(
		  <div>
		    <div className="jumbotron clearfix">
		    	<div className="pull-left">
		      	<h1 className="text-center">Welcome to Round Robin!</h1>
		      	<h4>Your hub for Craft Exchanges, Secret Santas, Sweets Swaps, and More!</h4>
		      </div>
		      <div className="pull-right">
		      	<img src="./roundRobinWithGift1-leftFacing.png" className="logo"/>
	      	</div>
	      </div>
		    <div className="well">
		    	<h2 className="text-center">How it works</h2>
		    	<div className="row how-works">
		    		<div className="col-sm-3">
		    			<img src="./roundRobin.png" className="smallLogo" />
		    			<div className="how-to">
		    				Create an Event as a Moderator - Make it Public or Private  
		    			</div>
		    		</div>
		    		<div className="col-sm-3">
		    			<img src="./roundRobin.png" className="smallLogo" />
		    			<div className="how-to">
		    				Or, Join an Existing Event - by Invite, or by Searching for Public Events.  
		    			</div>
		    		</div>		    		
		    		<div className="col-sm-3">
		    			<img src="./roundRobin.png" className="smallLogo" />
		    			<div className="how-to">
		    				Once the Signup period ends: All of the Users will be matched, Round-Robin style - You get someone to send a gift to, and a different person gets your name
		    			</div>
		    		</div>
		    		<div className="col-sm-3">
		    			<img src="./roundRobinWithGift.png" className="smallLogo" />
		    			<div className="how-to">
		    				Craft! Shop! Create! And Ship your gift to your Match by the Shipping Deadline
		    			</div>
		    		</div>
		    	</div>
		    </div>
		    <div className="well">
			    {data}
		    </div>
      	<footer>
        	<small>&copy; Copyright 2017, Natalie Ike.  All Rights Reserved</small>
      	</footer>
			</div>);
  };

 }
const mapStateToProps = state => {
	return{
		isFetching: state.manageMyEvents.isFetching,
		myManagedEvents: state.manageMyEvents.myManagedEvents,
    user: state.loginReducer.userId,
		categories: state.allCategories.categories,
		category: state.selectCategories.category, 
		matchOption: state.selectMatchOption.matchOption,
		eventName: state.registerFormData.eventName,
		organizerAka: state.registerFormData.organizerAka,
		aboutEvent: state.registerFormData.aboutEvent, 
		isPrivate: state.registerFormData.isPrivate,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn,
    firstName: state.loginReducer.firstName,
    lastName: state.loginReducer.lastName
	};
};

export default connect(mapStateToProps, null)(Home);
