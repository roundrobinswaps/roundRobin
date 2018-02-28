import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleModal} from '../actions';

class ViewDetailsButton extends Component{
    render(){
      const {toggleModal} = this.props;
      return (
        <button 
        	onClick={e => toggleModal(this.props.id)}
        	className="btn btn-primary"
      	>
      		View Details
    		</button>
  		);
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleModal
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ViewDetailsButton);