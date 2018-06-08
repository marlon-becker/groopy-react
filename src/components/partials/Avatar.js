import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Groopy-avatar">
        <img src={this.props.image} />
      </div>
    )
  }
}

export default Avatar;
