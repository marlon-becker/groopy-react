import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PollElementVote from './PollElementVote';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addToGroupTimeLine } from '../actions/chat.action';

import '../styles/PollElement.css';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      voted: false,
      selection: null,
      totalResponses: [],
      questions: [],
      poll: null,
      pollId: null,
      topResponse: null
    }
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;
    axios.get(`${this.props.apiUrl}/polls/${pollId}`, {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }).then(response => {
      const responses = response.data.responses.reduce((acc, el) => {
        acc[el.response] ? acc[el.response]++ : acc[el.response] = 1;
        return acc;
      }, Array(4).fill(0));
      const max = responses.reduce((acc, e) => e > acc ? e : acc, 0);
console.log('TOP RESPONSE', max);
console.log(responses);
      this.setState({
        poll: response.data,
        questions: response.data.questions,
        totalResponses: responses,
        topResponse: max,
        pollId
      })
    });
  }

  vote = (option) => {
    axios.put(`${this.props.apiUrl}/polls`, {
      pollId: this.state.pollId,
      option}, {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }).then(response => {
      this.setState({
        voted: true,
        selection: option
      })
      this.props.socket.emit('votePoll', this.props.user._id, this.props.currentGroup, this.state.pollId)
    });
  }


  render() {
    if(this.state.poll && this.state.poll.status != 'closed') {
      return (
        <Formik
        initialValues={{
        }}
        onSubmit={(values, actions) => {
        }}

        render={props => (
          <div className="Groopy-register Groopy-form">
          <h2 className="form-signin-heading">Vote for one of the gifts</h2>
          {this.state.poll && this.state.poll.responses?
            <div class="alert alert-info">{Object.keys(this.state.poll.responses).length} votes in total</div>
            : ''
          }
          {this.state.voted !== true ?
          <form className="PollVote" onSubmit={props.handleSubmit}>
            {this.state.questions.map((question, key) => <PollElementVote totalVotes={this.state.totalResponses[key] ? this.state.totalResponses[key] : 0} handleVote={this.vote} number={key} question={question} />)}
          </form>
          :
          <div class="msg">
          <br />
          <div class="alert alert-success">Thank you for your vote!</div>
          <p><Link to="/groups">Back to the group</Link></p>
          <PollElementVote selected={true} question={this.state.questions[this.state.selection]} />
          </div>
          }
        </div>
        )}
      />
      )
    } else {
      return (
        <div className="Groopy-register Groopy-form">
        <h2>A decision has been made</h2>
            {this.state.questions.map((question, key) => <PollElementVote topResponse={this.state.topResponse} totalVotes={this.state.totalResponses[key] ? this.state.totalResponses[key] : 0} handleVote={this.vote} number={key} question={question} />)}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    currentGroup: state.chat.currentGroup,
    user: state.user.user,
    socket: state.chat.socket,
    token: state.user.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToGroupTimeLine: (message, type) => dispatch(addToGroupTimeLine(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
