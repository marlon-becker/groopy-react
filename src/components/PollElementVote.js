import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollElementVote extends Component {
  handleVote = () => {
    this.props.handleVote(this.props.number);
  }

  getClass() {
    const classNames = ['PollElement', 'PollElement--vote'];
    console.log('top response', this.props.topResponse);
    if(this.props.totalVotes === this.props.topResponse) {
      classNames.push('PollElement--winner');
    }
    return classNames.join(' ');
  }
  render() {
    return (
      <div className={this.getClass()}>
        <div className="PollElement__img">
          <img src={this.props.question.photo} />
        </div>
        <div className="PollElement__title">
          <h3>{this.props.question.title} {this.props.totalVotes && this.props.totalVotes > 0 ? <div class="_small">{this.props.totalVotes} votes(s)</div> : ''} </h3>
        </div>
        {this.props.selected !== true && this.props.topResponse === undefined?
        <div className="PollElement__button">
          <button onClick={this.handleVote} className="btn btn-primary">vote</button>
        </div> : ''
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(PollElementVote);
