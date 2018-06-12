import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { axios } from 'axios';
import PollElement from './PollElement';
import { Link } from 'react-router-dom';

import '../styles/PollElement.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      imageUrls: {},
      submitAllowed: true
    }
  }

  setImage = (number, url) => {
    this.state.imageUrls[number] = url;
    this.setState({
      imageUrls: this.state.imageUrls
    })
  }

  setStatus = (allow) => {
    this.setState({
      submitAllowed: allow
    })
  }

  render() {
    return (
      <Formik
      initialValues={{
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        console.log(this.state.imageUrls);
        actions.setSubmitting(false);
      }}

      render={props => (
        <div className="Groopy-register Groopy-form">
        <h2 className="form-signin-heading">Create a new poll</h2>
        <p>Select the elements for you poll</p>
        <form onSubmit={props.handleSubmit}>
          <PollElement handleSubmitStatus={this.setStatus} handleSetImage={this.setImage} pollElementNumber="1" {...props} />
          <PollElement handleSubmitStatus={this.setStatus}  handleSetImage={this.setImage} pollElementNumber="2" {...props} />
          <PollElement handleSubmitStatus={this.setStatus}  handleSetImage={this.setImage} pollElementNumber="3" {...props} />
          <PollElement handleSubmitStatus={this.setStatus} handleSetImage={this.setImage} pollElementNumber="4" {...props} />
          {
            this.state.submitAllowed
            ?
            <button className="btn btn-lg btn-secondary btn-block" type="submit">Send</button>
            :
            <button disabled className="btn btn-lg btn-secondary btn-block" type="submit">Send</button>
          }
        </form>
      </div>
      )}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
