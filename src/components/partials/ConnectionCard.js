import React, { Component } from 'react';
import Avatar from './Avatar';

class ConnectionCard extends Component {
  render() {
    return (
      <div className="Groopy-user Groopy-user--connection">
        <Avatar image={this.props.user.avatar} />
        <div className="Groopy-user__info">
          <div className="Groopy-user__title">{this.props.user.name}</div>
        </div>
      </div>
    );
  }
}

export default ConnectionCard;
