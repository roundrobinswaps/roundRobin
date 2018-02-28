import React,{Component} from 'react';
import {connect} from 'react-redux';
import ViewDetailsButton from './ViewDetailsButton';
import Modal from 'react-modal';
import {toggleModal, matchAction} from '../actions';
import {bindActionCreators} from 'redux';

class DetailsModal extends Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalFunction = this.handleModalFunction.bind(this);
  }

  closeModal(){
    this.props.toggleModal(null);
  }

  handleModalFunction(){
    this.props.dispatch(this.props.buttonAction(this.props.args));
    this.props.toggleModal(null);
  }

  render(){
    const {activeModal} = this.props;
//    const status = modalStatus ? "true": "false";
    return (
      <div>
        <ViewDetailsButton
          id={this.props.label}
        />
        <Modal
          isOpen={activeModal === this.props.label}
          onRequestClose={this.closeModal}
          className="modal-dialog"
          ariaHideApp={false}
          id={this.props.label}
          >
          <div className="modal-content darkerGrey">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.data}
            </div>
            <div className="modal-footer">
             <button type="button" className={this.props.hiddenClass} onClick={this.handleModalFunction}>{this.props.btnmessage}</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    activeModal: state.modal.modalId
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleModal, matchAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);