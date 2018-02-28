import React from "react";
import AlertMessage from "./AlertMessage"; 

const EventResult = props => {

  let resultTable = props.results.map((result, i) => {
    let button = "";
    if(!props.myEvents.find(x => x.event.id == result.id)){
      console.log(props.isShowingInfoAlert);
      button =
        <div>           
          <button 
            onClick={props.onClick} 
            className="btn btn-success" 
            value={result.id}
          >
            Join
          </button>
        </div>
    }else{
      button = <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
    }
    return(
      <tr key={result.id}>
        <td>{result.id}</td>
        <td>{result.eventName}</td>
        <td>{result.organizer}</td>
        <td>{result.shipDeadline}</td>
        <td>{button}</td>
      </tr>
  )});

  return(  
    <div className="panel">
      <div className="panel-heading eggshellBlue">
        <h3 className="panel-title">Search Results</h3>
      </div>
      <div className="panel-body featherGrey">
        <label>Click Join to Participate in an Event:</label>
        <table className="table">
          <tbody>
            <tr>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Organizer</th>
              <th>Shipping Deadline</th>
              <th>Participate</th>
            </tr>
            {resultTable}
          </tbody>
        </table>
        <hr/>
      </div>
      <AlertMessage 
        type="success"
        message="Joined!"
        position="bottom-right"
        isShowingInfoAlert={props.isShowingInfoAlert}
        onDismiss={props.toggleIsShowingInfoAlert}
        dispatch={props.dispatch}
      />
    </div>);
};

export default EventResult;