import React, { Component } from 'react';
import Avatar from './Avatar';

class Currentuser extends Component {
  render() {
    return (
      <div className="Groopy-user">
        <Avatar image={this.props.user.avatar} />
        <div className="Groopy-user__info">
          <div className="Groopy-user__title">{this.props.user.name}</div>
          <div className="Groopy-user__status">Online</div>
        </div>
      </div>
    )
  }
}

export default Currentuser;
