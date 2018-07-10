import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {

  getClass() {
    const className = ['Groopy-message'];
    console.log(this.props.text);
    if (this.props.text._id === this.props.user._id) {
        className.push('Groopy-message--user');
    }
    return className.join(' ');
  }

  getName() {
    if(this.props.text._id !== this.props.user._id) {
      return <div className="Groopy-message__name">
        {this.getAvatar()}
        {this.props.text.name}
      </div>;
    } else {
      return '';
    }
  }

  getAvatar() {
    if(this.props.text._id !== this.props.user._id) {
      return <span class="Groopy-mini-avatar">
        <img src={this.props.text.avatar} />
      </span>;
    } else {
      return '';
    }
  }

  getFormattedDate() {
    const date = new Date(this.props.text.date);
    return moment(date).format("LLL");
  }

  render() {
    return (
      <div className={this.getClass()}>
        <div className="Groopy-message__content">

          {this.getName()}
          <div className="Groopy-message__date">
            {this.getFormattedDate()}
          </div>
          {this.props.text.message}
        </div>
      </div>
    )
  }
}

export default Message;
