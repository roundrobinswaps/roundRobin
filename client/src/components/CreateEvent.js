import React from "react";
 
const CreateEvent = props => {
  return(
    <div className="panel">
      <div className="panel-heading eggshellBlue">
        <h3 className="panel-title">Create an Event</h3>
      </div>
      <div className="panel-body featherGrey">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Event Name</label>
            <div className="col-sm-10">
              <input type="text" 
                className="form-control" 
                id="eventName" 
                placeholder="Event Name"
                value={props.eventnamevalue}
                onChange={e => props.onEventNameChange(e.target.value)}
                />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Group / Organizer Name</label>
            <div className="col-sm-4">
              <input type="text" 
              className="form-control" 
              id="organizerAka" 
              placeholder="Group/Organizer Name"
              value={props.organizerAkaValue}
              onChange={e => props.onOrganizerAkaChange(e.target.value)}
              />
            </div>
            <label className="col-sm-2 control-label">Category:</label>
            <div className="col-sm-4">
              <select 
                id="category"
                className="form-control col-sm-6"
                value={props.categoryvalue}
                onChange={e => props.onCategoryChange(e.target.value)}>
                {props.options.map(category =>
                  <option value={category.id} 
                    key={category.id}>
                    {category.categoryName}
                  </option>)
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Allow Match Options:</label>
            <div className="col-sm-4">
              <select className="form-control"
                value={props.matchoptionvalue}
                onChange={event => props.onOptionChange(event.target.value)}>
                <option
                  value="1">
                  Per Shipping Preferences Only
                </option>
                <option
                  value="2">
                  Totally Random
                </option>
              </select>
            </div>
            <div className="col-sm-offset-1 col-sm-2">
              <div className="radio">
                <label>
                  <input type="radio" 
                    name="isPrivate" 
                    id="private" 
                    value="true"  
                    onClick={event => props.onRadioButtonChange(event.target.value)}
                  />
                  Private Event
                </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="radio">
                <label>
                  <input type="radio" 
                  name="isPrivate" 
                  id="public" 
                  value="false"
                  onClick={event => props.onRadioButtonChange(event.target.value)}
                  />
                  Public Event
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">About This Event</label>
            <div className="col-sm-10">
              <textarea className="form-control" 
                rows="3" 
                id="aboutEvent" 
                placeholder="About This Event"
                value={props.aboutEventValue}
                onChange={e => props.onAboutEventChange(e.target.value)}
                ></textarea>
            </div>
          </div>             
          <div className="form-group">
            <div className="col-sm-offset-9 col-sm-3">
              <button className="btn btn-success searchBtn"
                onClick={props.onClick}>
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;