import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { axios } from 'axios';
import { Link } from 'react-router-dom';
import UploadFile from './UploadFile';

class PollElement extends Component {
  render() {
    console.log(this.props.handleSetImage);
    return (
      <div className="PollElement">
        <div className="PollElement__title">
          <input
            type="text"
            id={`pollTitle_${this.props.pollElementNumber}`}
            className="form-control"
            placeholder="Title of the option..."
            required
            autoFocus
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
            name={`pollTitle_${this.props.pollElementNumber}`}
          />
        </div>
        <UploadFile
        name={`pollTFile_${this.props.pollElementNumber}`}
        {...this.props}
        handleSetImage={this.props.handleSetImage}
        handleSubmitStatus={this.props.handleSubmitStatus} 
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGroup: state.chat.currentGroup,
    user: state.user.user,
    socket: state.chat.socket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollElement);
