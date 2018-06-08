import React, { Component } from 'react';
import { setUserGroups, setUserConnections, setUser} from '../actions/user';
import { joinGroup, leaveGroup, sendMessage, selectGroup, setCurrentMessage} from '../actions/chat';
import { connect } from 'react-redux';
import axios from 'axios';

import GroupList from './partials/GroupList';
import Currentuser from './partials/Currentuser';
import MessageBoard from './MessageBoard';

import '../styles/chat.css';

const api = 'http://localhost:3000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjg0NzQxMzEsImRhdGEiOnsiZW1haWwiOiJuZWRAd2ludGVyZmVsbC5jb20ifSwiaWF0IjoxNTI4NDUyNTMxfQ.DijvBEN8zcDmzxgDssaPqBl2BtHEnt9bqAIj919_QF4';

class Chat extends Component {
  componentDidMount() {
    const user =  axios.get(api+'/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => this.props.setUser(response.data));

    const groups =  axios.get(api+'/users/active-groups', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => {
      this.props.setUserGroups(response.data);
      response.data.map((group) => {
        this.props.joinGroup(group._id);
      })
    });

    const connections =  axios.get(api+'/users/connections', {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => this.props.setUserConnections(response.data));
  }

  render() {
    return (
      <div className="Groopy-chat-wrapper">
          <div className="Groopy-chat-sidebar">
            <Currentuser user={this.props.user} />
            <GroupList groups={this.props.groups} />
          </div>
          <MessageBoard />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.chat.groups,
    user: state.user.user,
    connections: state.user.connections,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserGroups: groups => dispatch(setUserGroups(groups)),
    setUserConnections: connections => dispatch(setUserConnections(connections)),
    setUser: user => dispatch(setUser(user)),
    joinGroup: group => dispatch(joinGroup(group)),
    selectGroup: group => dispatch(selectGroup(group)),
    leaveGroup: group => dispatch(leaveGroup(group)),
    sendMessage: e => dispatch(sendMessage(e)),
    setCurrentMessage: e => dispatch(setCurrentMessage(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
