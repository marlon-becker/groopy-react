import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToGroupTimeLine } from '../actions/chat.action';
import { Formik } from 'formik';
import { axios } from 'axios';

class SearchBar extends Component {

  render() {
    return (

         <div className="Groopy-search-bar">
          <div className="input-group">
            <input
              type="text"
              id="GroopySearch"
              className="Groopy-text-input__text form-control"
              placeholder={this.props.placeholder}
              aria-label="Input group example"
              aria-describedby="btnGroupAddon2"
              required
              onKeyUp={this.props.handleKeyPress}
              name="serachValue"
            />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
