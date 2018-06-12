import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { setToken } from '../actions/user.action';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/signin.css';

class Login extends Component {
  render() {
    return (
      <Formik
      initialValues={{
        signIn_username: 'ned@winterfell.com',
        signIn_password: 'test',
      }}
      onSubmit={(values, actions) => {
        const connection = axios.get(this.props.apiUrl+'/sign-in', {
         auth: {
           username: values.signIn_username,
           password: values.signIn_password
         }
       }).then(response => {
         this.props.setToken(response.data.token);
         this.props.history.push('/groups');
         }
       );
      actions.setSubmitting(false);
      }}

      render={props => (
        <div className="Groopy-sing-in Groopy-form">
        <h2 className="form-signin-heading">Please sign in</h2>
        <p>Log in to start organizing your events</p>
        <form onSubmit={props.handleSubmit}>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.signIn_username}
            name="signIn_username"
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.signIn_password}
            name="signIn_password"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button className="btn btn-lg btn-secondary btn-block" type="submit">Sign in</button>
          <div className="Groopy-form__post_content"><Link to="/register">Or create a new user</Link></div>
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
    token: state.user.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setToken(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
