import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';
import { Link } from 'react-router-dom';

import { setCurrentMessage, sendMessage, loadMessages } from '../actions/chat.action';
import Message from './partials/Message';
import MessagePoll from './partials/MessagePoll';
import ChatTextInput from './ChatTextInput';
import UserStatus from './UserStatus';

class MessageBoard extends Component {

  printMessage = (message) => {
    console.log(message);
    switch(message.type) {
      case 'text':
      return <Message user={this.props.user} text={message} />
      break
      default:
      return <MessagePoll message={message} />
    }
  }
  checkGroupSelected = () => {
    if (this.props.currentGroup) {
      return (
        <div className="Groopy-message-board">
          <div className="Groopy-message-group-info">
            {this.props.groupUsers.map((user) => user._id != this.props.user._id ? <UserStatus key={user._id} user={user} /> : '')}
          </div>
          <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="Groopy-messages"
            horizontal={false}
            >
            {this.props.messages.map((message) => this.printMessage(message))}
          </ScrollArea>
          <ChatTextInput />
        </div>
      );
    } else {
      return (
        <div className="Groopy-message-board Groopy-message-board--no-group">
          <div className="Groopy-message-select">
            <div>Please select a group!</div>
            <hr />
            <button  type="button" className="btn btn-secondary btn-lg">
              <Link to="/groups/new">Create a new event</Link>
            </button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Groopy-chat-main">{this.checkGroupSelected()} </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGroup: state.chat.currentGroup,
    groupUsers: state.chat.groupUsers,
    user: state.user.user,
    messages: state.chat.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentMessage: e => dispatch(setCurrentMessage(e)),
    sendMessage: e => dispatch(sendMessage(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
