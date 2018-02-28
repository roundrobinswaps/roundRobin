import React, { Component} from 'react';
import { loginToDb, receiveFbData, isLoggedIn } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class FbLogin extends Component {

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1596794870414703',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
      });
      window.FB.AppEvents.logPageView();
      window.FB.getLoginStatus(function(response) {
        console.log(response.status);
      });
      window.FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('---->User logged out, cancelled login, or did not fully authorize.');
          this.checkLoginState();
        }
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1596794870414703';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    let that = this;
    console.log('Welcome! Fetching your information.... ');
    window.FB.api('/me?fields=name,email,first_name,last_name', function(response) {
      console.log('Successful login for: ' + response.name);
      that.props.dispatch(receiveFbData(response));
    })
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    this.props.dispatch(loginToDb(response))
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.

    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
    }
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
   
    window.FB.login(this.checkLoginState(), 
                    {scope: 'public_profile, email',
                      return_scopes: true});
  }

/*
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleResponse = (data) => {
    console.log(data);
  }
 */
  handleError = (error) => {
    console.log(error);
  }
 
  render() {
    return (
      <div>
        <div className="fb-login-button" 
          data-max-rows="1" 
          data-size="medium" 
          data-button-type="login_with" 
          data-show-faces="false" 
          data-auto-logout-link="true" 
          data-use-continue-as="true"
          onClick={this.handleClick}
          onlogin={this.checkLoginState}
          onError={this.handleError}
        >
        </div>
      </div>              
    );
  }
}

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ loginToDb, receiveFbData, isLoggedIn });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
  return{
    user: state.allCategories.user
   };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);  
