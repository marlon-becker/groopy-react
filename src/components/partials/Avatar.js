import React, { Component } from 'react';
class Avatar extends Component {

  render() {
    return (
      <div className="Groopy-avatar">
        <img src={this.props.image} />
      </div>
    )
  }
}

export default Avatar;
