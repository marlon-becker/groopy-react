import React, { Component } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Chat from './components/Chat';
import { connect } from 'react-redux';
import { setUserGroups, setUserConnections, setUser} from './actions/user'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './styles/signin.css';

class App extends Component {
  render() {
    return (
      <div className="Groopy-wrapper">
        <Header />
        <Chat />
        <Router>
          <Route exact={true} path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
