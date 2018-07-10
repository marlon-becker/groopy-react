import React, { Component } from 'react';
import Avatar from './partials/Avatar';

class UserCard extends Component {
  render() {
    return (
      <div className="Groopy-selected-user">
        <Avatar image={this.props.user.avatar} />
        <div className="Groopy-user__info">
          <div className="Groopy-user__title">{this.props.user.name}</div>
        </div>
      </div>
    )
  }
}

export default UserCard;
