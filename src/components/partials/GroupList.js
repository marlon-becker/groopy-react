import React, { Component } from 'react';
import LinkGroup from '../LinkGroup';

class GroupList extends Component {
  render() {
    return (
      <div className="Groopy-groups">
        {this.props.groups.map((group) => {
          return (<LinkGroup group={group} />)
        })}
      </div>
    )
  }
}

export default GroupList;
