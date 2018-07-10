import React, { Component } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Chat from './components/Chat';
import Poll from './components/Poll';
import GroupInfo from './components/GroupInfo';
import Connections from './components/Connections';
import PollVote from './components/PollVote';
import SplashPage from './components/SplashPage';
import Register from './components/Register';
import CreateGroup from './components/CreateGroup';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

// then our route config
const routes = [
  {
    path: "/login",
    component: Login,
    auth: false
  },
  {
    path: "/groups/new",
    component: CreateGroup,
    auth: false
  },
  {
    path: "/register",
    component: Register,
    auth: false
  },
  {
    path: "/groups",
    component: Chat,
    auth: true
  },
  {
    path: "/group/:id",
    component: GroupInfo,
    auth: true
  },
  {
    path: "/plugin/add-poll",
    component: Poll,
    auth: true
  },
  {
    path: "/polls/:id",
    component: PollVote,
    auth: true
  },
  {
    path: "/connections",
    component: Connections,
    auth: true
  },
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      props.isAuthenticated === true || !props.auth
          ? <route.component {...props} routes={route.routes} />
          : <Redirect to='/login' />
      )}
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Groopy-wrapper">
          <Header />
          <Switch>
            <Route exact path="/" component={SplashPage} />
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
