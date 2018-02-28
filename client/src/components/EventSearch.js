import React from "react";
 
const EventSearch = props => {
  return(
    <div className="panel">
      <div className="panel-heading eggshellBlue">
        <h3 className="panel-title">Search for an Event</h3>
      </div>
      <div className="panel-body featherGrey">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-5">Search for a Public Event by Category:</label>
            <div className="col-sm-5">
              <select 
                className="form-control"
                value={props.category}
                onChange={e => props.onChange(e.target.value)}>
                <option value="0" >Select a Category</option>
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
            <label className="col-sm-5">If you have an Invitation, Search By Event Id:</label>
            <div className="col-sm-5">
              <input 
                className="form-control"
                value={props.eventIdValue}
                onChange={e => props.eventIdOnChange(e.target.value)}>
              </input>
            </div>
          </div>
          <button className="btn btn-primary col-sm-offset-10"
            onClick={props.onClick}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventSearch;