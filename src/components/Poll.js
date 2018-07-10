import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PollElement from './PollElement';
import { addToGroupTimeLine } from '../actions/chat.action';

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
    const imageUrls = this.state.imageUrls;
    imageUrls[number] = url;
    this.setState({
      imageUrls: imageUrls
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
        const data = new FormData();
        const numberOfOptions = 4;
        data.append('options', numberOfOptions);
        data.append('groupId', this.props.currentGroup);
        for (var i = 1; i <= numberOfOptions; i++) {
          data.append(`pollTitle_${i}`, values[`pollTitle_${i}`]);
        }

        for(let prop in this.state.imageUrls) {
          data.append(`pollImage_${prop}`, this.state.imageUrls[prop]);
        }

        fetch(`${this.props.apiUrl}/polls`, {
          method: 'POST',
          headers: new Headers({
            'Authorization': `Bearer ${this.props.token}`,
          }),
          body: data,
        }).then((response) => {
          response.json().then((poll) => {
            if(poll._id) {
              const newPollData = {
                poll: poll._id,
                group: poll.name,
                userId: this.props.user._id,
                avatar: this.props.user.avatar
              };
              this.props.addToGroupTimeLine(newPollData, 'poll');
              this.props.history.push('/groups')
              actions.setSubmitting(false);
            }
          });
        });
      }}

      render={props => (
        <div className="Groopy-register Groopy-form">
        <h2 className="form-signin-heading">What should be the gift?</h2>
        <p>Please select 4 options</p>
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
    apiUrl: state.config.apiUrl,
    currentGroup: state.chat.currentGroup,
    user: state.user.user,
    socket: state.chat.socket,
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToGroupTimeLine: (message, type) => dispatch(addToGroupTimeLine(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
