import React, { Component } from "react";
import { Link } from "react-router-dom";
import FbLogin from "./FbLogin";
import { connect } from 'react-redux';

const Navpills = (props) => {
  let navItems = "";

  if(props.loginStatus == "connected"){
    navItems =         
      <ul className="nav nav-pills nav-justified robinNav">
        <li role="presentation" >
          <FbLogin fb={window.FB}/>
        </li>
        <li role="presentation" className={window.location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li role="presentation" className={window.location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">Profile</Link>
        </li>
        <li role="presentation" className={window.location.pathname === "/participate" ? "active" : ""}>
          <Link to="/participate">Participate</Link>
        </li>
        <li role="presentation" className={window.location.pathname === "/createmanage" ? "active" : ""}>
          <Link to="/createmanage">Create/Manage Events</Link>
        </li>
      </ul>
  } else{
    navItems = 
      <ul className="nav nav-pills nav-justified robinNav">
        <li role="presentation">
          <FbLogin fb={window.FB}/>
        </li>
      </ul>
  }

  return(
    <div>
      {navItems}
    </div>
  );
};

export default Navpills;