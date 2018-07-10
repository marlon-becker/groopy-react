import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToGroupTimeLine } from '../actions/chat.action';
import { Formik } from 'formik';
import { axios } from 'axios';

class ChatTextInput extends Component {

  render() {
    return (
      <Formik
      initialValues={{  }}
      onSubmit={(values, actions) => {
        console.log('addToGroupTimeLine', values.groopyChatMessage);
        this.props.addToGroupTimeLine(values.groopyChatMessage, 'text');

        const messagesContainer = document.querySelector('.Groopy-messages');
        const scrollArea = document.querySelector('.scrollarea-content');
        const newScrollTop = scrollArea.scrollTop = 0;
        values.groopyChatMessage = '';
        actions.setSubmitting(false);
      }}

      render={props => (
        <form onSubmit={props.handleSubmit}>
         <div className="Groopy-text-input">
          <div className="input-group">
            <input
              type="text"
              id="GroopySearch"
              className="Groopy-text-input__text form-control"
              placeholder="Send a message..."
              aria-label="Input group example"
              aria-describedby="btnGroupAddon2"
              required
              autoFocus
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.groopyChatMessage}
              name="groopyChatMessage"
            />
          </div>
          <div className="Groopy-text-input__button input-group-append">
            <button type="submit" className="input-group-text btn btn-primary Groopy-btn__send">Send</button>
          </div>
          </div>
      </form>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGroup: state.chat.currentGroup,
    user: state.user.user,
    messages: state.chat.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToGroupTimeLine: (message, type) => dispatch(addToGroupTimeLine(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTextInput);
