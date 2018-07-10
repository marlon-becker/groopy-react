import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUserGroups, setUserConnections, setUser} from '../actions/user.action';
import { updateSocket, connectUser, joinGroup, leaveGroup, selectGroup, updateMessages, updateCurrentGroupUsers } from '../actions/chat.action';

import GroupList from './partials/GroupList';
import Currentuser from './partials/Currentuser';
import MessageBoard from './MessageBoard';

import '../styles/chat.css';

class Chat extends Component {
  componentDidMount() {
    const token = this.props.token;
    const socket = openSocket('http://localhost:3000', {query: `auth_token=${token}`});

    socket.on('error', function (err) {
      console.log('received socket error:')
      console.log(err)
    });

    socket.on('messages', (data) => {
      this.props.updateMessages(data);
    });

    socket.on('updateGroupUsers', (data) => {
      this.props.updateCurrentGroupUsers(data);
    });

    this.props.updateSocket(socket);

    axios.get(this.props.apiUrl+'/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      this.props.setUser(response.data);
      this.props.connectUser(response.data._id);
    });

    axios.get(this.props.apiUrl+'/users/active-groups', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      this.props.setUserGroups(response.data);
      response.data.map((group) => {
       return this.props.joinGroup(this.props.user._id, group._id);
      })
    });

    axios.get(this.props.apiUrl+'/users/connections', {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => this.props.setUserConnections(response.data));
  }

  render() {
    if(this.props.token) {
    return (
        <div className="Groopy-chat-wrapper">
          <div className="Groopy-chat-sidebar">
            <Currentuser user={this.props.user} />
            <GroupList groups={this.props.groups} />
          </div>
          <MessageBoard />
        </div>
    );
  } else { return (<Redirect to="/login" />) }
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    groups: state.chat.groups,
    user: state.user.user,
    token: state.user.token,
    socket: state.chat.socket,
    connections: state.user.connections,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserGroups: groups => dispatch(setUserGroups(groups)),
    setUserConnections: connections => dispatch(setUserConnections(connections)),
    setUser: user => dispatch(setUser(user)),
    connectUser: user => dispatch(connectUser(user)),
    joinGroup: (userId, groupId) => dispatch(joinGroup(userId, groupId)),
    selectGroup: group => dispatch(selectGroup(group)),
    leaveGroup: group => dispatch(leaveGroup(group)),
    updateSocket: socket => dispatch(updateSocket(socket)),
    updateMessages: messages => dispatch(updateMessages(messages)),
    updateCurrentGroupUsers: users => dispatch(updateCurrentGroupUsers(users)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
