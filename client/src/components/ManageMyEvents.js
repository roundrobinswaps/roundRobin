import React,{Component} from 'react';
import {connect} from 'react-redux';
import DetailsModal from "./DetailsModal";
import Modal from 'react-modal';
import { toggleModal, matchAction } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'

class ManageMyEvents extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let resultTable = this.props.results.map((result, i) => {
      let signupDeadline = result.signupDeadline;
      if(result.status.id > 1){
        signupDeadline = "The signup deadline has already passed.";
      }
      let privateNote = "This event is open to the public, and will show in all search results.";
      if (result.isPrivate){
        privateNote = "This event is private.  In order for a participant to join, they must search for it by the Event ID listed above.";
      }
      let hidden = "invisible";
      let message = "";
      if(result.status.id === 1){
        hidden = "btn btn-primary"
        message = "Close Signup and Match Participants"
      }
      let organizer = result.user.firstName + " " + result.user.lastName;
      if(result.organizerAka){
        organizer = result.organizerAka;
      }
      let args = {
        id: result.id,
        userId: this.props.user
      }
      return(
        <tr key={result.id}>
          <td>{result.id}</td>
          <td>{result.shipDeadline}</td>
          <td>{result.eventName}</td>
          <td>{result.status.statusName}</td>
          <td><DetailsModal 
            title={result.eventName}
            label={result.id}
            hiddenClass={hidden}
            btnmessage={message}
            args={args}
            buttonAction={matchAction}
            dispatch={this.props.dispatch}
            data={
              <div>
              <p>Event Details</p>
                <div className="well well-sm">
                  <ul className="list-unstyled">
                    <li><label>Event Status:</label> {result.status.statusName}</li>
                    <li><label>Event ID:</label> {result.id}</li>
                    <li><label>Organizer:</label> {organizer}</li>
                    <li><label>Category:</label> {result.category.categoryName}</li>
                    <li><label>Signup Deadline:</label> {signupDeadline}</li>
                    <li><label>Shipping Deadline:</label> {result.shipDeadline}</li>
                    <li><label>Match Option: </label> {result.matchOption.matchDescription}</li>
                    <li><label>About this Event:</label> {result.aboutEvent}</li>
                  </ul>
                </div>
                <div><label>{privateNote}</label></div>
              </div>
            }
          /></td>
        </tr>
    )});
    return(  
      <div className="panel">
        <div className="panel-heading eggshellBlue">
          <h3 className="panel-title">Manage My Events</h3>
        </div>
        <div className="panel-body featherGrey">
          <table className="table">
            <tbody>
              <tr>
                <th>Event ID</th>
                <th>Shipping Deadline</th>
                <th>Event Name</th>
                <th>Status</th>
                <th>More</th>
              </tr>
              {resultTable}
            </tbody>
          </table>
          <hr/>
        </div>
      </div>
    );
  }
};


const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({toggleModal, matchAction });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
  return{
    user: state.loginReducer.userId,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMyEvents);
