import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToGroupTimeLine } from '../../actions/chat.action';

class PollMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pollId: null,
      status: 'open',
      poll: null,
      totalResponses: [],
      questions: []
    }
  }

  componentDidMount() {
    const status = this.props.message.message.status;
    this.setState({
      pollId: this.props.message.message.poll,
      status: status ? status : 'open',
    });

    const pollId = this.props.message.message.poll;
    axios.get(`${this.props.apiUrl}/polls/${pollId}`, {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }).then(response => {
      const responses = response.data.responses.reduce((acc, el) => {
        acc[el.response] ? acc[el.response]++ : acc[el.response] = 1;
        return acc;
      }, Array(4).fill(0));

      this.setState({
        poll: response.data,
        questions: response.data.questions,
        totalResponses: responses,
        pollId
      })
    });
  }

  getClass() {
    const className = [
      'Groopy-message',
      'Groopy-message-extra',
      'Groopy-message-poll'
    ];
    return className.join(' ');
  }

  getFormattedDate() {
    const date = new Date(this.props.text.date);
    return moment(date).format("LLL");
  }

  closePoll = () => {
    axios.put(`${this.props.apiUrl}/polls/close`, {
      pollId: this.state.pollId}, {
      headers: { 'Authorization': `Bearer ${this.props.token}` }
    }).then(response => {
      this.setState({
        status: 'closed'
      })
      this.props.socket.emit('closePoll', this.props.currentGroup, this.state.pollId)
    });
  }

  render() {
    if( this.props.message.message.status === undefined || this.props.message.message.status != 'closed' ) {
      return (
          <div className={this.getClass()}>
            <div className="Groopy-message__content">
              <span class="Groopy-mini-avatar">
                <img src={this.props.message.message.avatar} />
              </span>
              {this.props.message.name} created a new birthday gifts list! <Link to={`/polls/${this.props.message.message.poll}`}>vote now</Link>

            {this.state.totalResponses ?
            <div className="Groopy-message__info">
              {this.state.totalResponses.reduce(function(a, v) { return a + v;}, 0)} friends have already voted
            </div>
            : ''
            }

            {this.props.message.message.userId === this.props.user._id ? <div className="Groopy-message-action"><hr /><button onClick={this.closePoll} class="btn">Close poll</button></div> : ''}
            </div>
          </div>
      );
    } else {
      return (
        <div className={this.getClass()}>
            <div className="Groopy-message__content">
              Gift poll have been closed <Link to={`/polls/${this.props.message.message.poll}`}>view results</Link>
            </div>
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
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToGroupTimeLine: (message, type) => dispatch(addToGroupTimeLine(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollMessage);
