import React,{Component} from 'react';
import {connect} from 'react-redux';
import DetailsModal from "./DetailsModal";
import Modal from 'react-modal';

class MyEvents extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let resultTable = this.props.results.map((result, i) => {
      let matchName = "You haven't been matched yet";
      let matchAddress = "";
      let aboutMatch = "";
      if(result.matchedUser){
        matchName = result.matchedUser.firstName + " " + result.matchedUser.lastName;
        matchAddress = result.matchedUser.streetAddress + ", " + result.matchedUser.city + ", " + result.matchedUser.stateProvince.stateProvinceName + " " + result.matchedUser.stateProvince.country.countryName + ", " + result.matchedUser.postalCode;
        aboutMatch = result.matchedUser.aboutMe || "";
      }
      let signupDeadline = result.event.signupDeadline;
      if(result.event.status.id > 1){
        signupDeadline = "The signup deadline has already passed.";
      }
      return(
        <tr key={result.id}>
          <td>{result.event.id}</td>
          <td>{result.event.eventName}</td>
          <td>{result.event.organizer}</td>
          <td>{result.event.shipDeadline}</td>
          <td><DetailsModal 
            title={result.event.eventName}
            label={result.event.id}
            hiddenClass="invisible"
            data={
              <div>
              <p>Event Details</p>
                <div className="well well-sm">
                  <ul className="list-unstyled">
                    <li><label>Event Status:</label> {result.event.status.statusName}</li>
                    <li><label>Event ID:</label> {result.event.id}</li>
                    <li><label>Category:</label> {result.event.category.categoryName}</li>
                    <li><label>Signup Deadline:</label> {signupDeadline}</li>
                    <li><label>Shipping Deadline:</label> {result.event.shipDeadline}</li>
                    <li><label>About this Event:</label> {result.event.aboutEvent}</li>
                  </ul>
                </div>
                <p>My Match</p>
                <div className="well well-sm">
                  <ul className="list-unstyled">
                    <li><label>Name:</label> {matchName}</li>
                    <li><label>Address:</label> {matchAddress}</li>
                    <li><label>About My Match:</label> {aboutMatch}</li>
                  </ul>
                </div>
              </div>
            }
          /></td>
        </tr>
    )});

    return(  
      <div className="panel">
        <div className="panel-heading eggshellBlue">
          <h3 className="panel-title">My Events</h3>
        </div>
        <div className="panel-body featherGrey">
          <table className="table" id="eventTable">
            <tbody>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Organizer</th>
                <th>Shipping Deadline</th>
                <th>More</th>
              </tr>
              {resultTable}
            </tbody>
          </table>
          <hr/>
        </div>
      </div>
    );
  };  
};


export default MyEvents;