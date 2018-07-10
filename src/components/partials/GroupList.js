import React, { Component } from 'react';
import LinkGroup from '../LinkGroup';
import SearchBar from '../SearchBar';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  handleChange = (value) => {
    this.setState({
      searchValue: this.escapeRegexCharacters(value.target.value.trim())
    })
  }

  render() {
    let groups = this.props.groups;
    if(this.state.searchValue !== '') {
    const regex = new RegExp('\\b' + this.state.searchValue, 'i');
    groups = this.props.groups
    .filter(group => {
      return (regex.test(group.name) || regex.test(group.type))
    });
    }

    return (
      <div className="Groopy-groups">
        <div className="_padd">
          <SearchBar handleKeyPress={this.handleChange} size="m" buttonText="Search" placeholder="Filter groups..." />
        </div>
        {groups.map((group) => {
          return (<LinkGroup key={group._id} group={group} />)
        })}
      </div>
    )
  }
}

export default GroupList;
