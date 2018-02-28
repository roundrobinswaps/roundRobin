import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ManageMyEvents from "../components/ManageMyEvents";
import { fetchMyManagedEvents, fetchCategories, selectCategory, selectMatchOptions, registerEventNameChange, registerOrganizerAkaChange, registerAboutEventChange, registerRadioButtonChange, submitNewEvent, toggleIsShowingInfoAlert } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'
import CreateEventForm from "../components/CreateEventForm"
import {reset} from 'redux-form';

class CreateManage extends Component {
  componentDidMount() {
    if(this.props.isLoggedIn){
      this.props.dispatch(fetchMyManagedEvents(this.props.user));
      this.props.dispatch(fetchCategories());  
    }
  };

  handleClick = values => {
   let newEventData = {
    	eventName: values.eventName,
    	organizerAka: values.organizerAka,
    	isPrivate: values.isPrivate || false,
    	aboutEvent: values.aboutEvent,
    	categoryId: values.category,
    	userId: this.props.user,
    	matchOptionId: values.matchOptionId
    }
    this.props.dispatch(submitNewEvent(newEventData));
    this.props.dispatch(reset('event'));
  }

  clearAlert = () =>{
    this.props.dispatch(toggleIsShowingInfoAlert(false));
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.isLoggedIn && nextProps.isLoggedIn){
      this.props.dispatch(fetchMyManagedEvents(nextProps.user));
      this.props.dispatch(fetchCategories());  
    }
  }

	render() {
    const { isFetching, myManagedEvents, user, categories, category, matchOption, eventName, organizerAka, aboutEvent, isPrivate, isLoggedIn, loginStatus, isShowingInfoAlert } = this.props
    let data;
    if (loginStatus == "connected"){
      data = <div>
        <CreateEventForm
          options={categories} 
          onSubmit={this.handleClick}
          toggleIsShowingInfoAlert={this.clearAlert}
          isShowingInfoAlert={isShowingInfoAlert}
        />
        <ManageMyEvents 
          results={myManagedEvents}
        />
      </div>
    } else {
      data = <div className="well">
        <p className="login">You must be logged in to view this content.</p>
      </div>
    }

		return(
		  <div>
		    <div className="jumbotron clearfix">
          <div className="pull-left">
  		      <h1>Create / Manage Events</h1>
  		      <h4>Create your own Swap, and Manage the Swaps you are Moderating</h4>
          </div>
          <div className="pull-right">
            <img src="./roundRobin-leftFacing1.png" className="logo2" />
          </div>
		    </div>
        {data}
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ fetchMyManagedEvents, fetchCategories, selectCategory, selectMatchOptions, registerEventNameChange, registerOrganizerAkaChange, registerAboutEventChange, registerRadioButtonChange, submitNewEvent, toggleIsShowingInfoAlert, reset });
  return { ...actions, dispatch };
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
    isShowingInfoAlert: state.modal.isShowingInfoAlert
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateManage);
