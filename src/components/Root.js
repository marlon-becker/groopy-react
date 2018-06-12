import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Root extends Component {

  render() {
    if(this.props.isAuthenticated) {
      return (<Redirect to={{pathname: "/groups"}} />)
    } else {
      return (<Redirect to={{pathname: "/login"}} />)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
