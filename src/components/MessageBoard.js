import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './partials/Message';

class MessageBoard extends Component {

  checkGroupSelected = () => {
    if (this.props.currentGroup) {
    return (
      <div className="Groopy-message-board">
        <div className="Groopy-messages"></div>
        <div className="Groopy-text-input">
          <div className="input-group">
            <input onKeyUp={this.props.setCurrentMessage} type="text" className="Groopy-text-input__text form-control" placeholder="Send a message..." aria-label="Input group example" aria-describedby="btnGroupAddon2" />
            <div className="Groopy-text-input__button input-group-append">
              <div onClick={this.props.sendMessage} className="input-group-text btn btn-primary Groopy-btn__send" id="btnGroupAddon2">Send</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Groopy-message-board Groopy-message-board--no-group">
        <div class="Groopy-message-select">Please select a group!</div>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
