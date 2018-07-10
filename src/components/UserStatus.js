import React, { Component } from 'react';

class UserStatus extends Component {

  getClass() {
    const className = ['Groopy-user-status-container'];
    if (this.props.user.status === 'connected') {
        className.push('Groopy-user-status--online');
    }
    return className.join(' ');
  }

  render() {
    return (
      <div className={this.getClass()}>
        <span className="Groopy-user-status"></span>
          {this.props.user.name}
      </div>
    )
  }
}

export default UserStatus;
