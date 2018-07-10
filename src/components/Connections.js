import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ConnectionCard from './partials/ConnectionCard';
import SearchBar from './SearchBar';
import { addToGroupTimeLine } from '../actions/chat.action';

class Connections extends Component {
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
    let connections = this.props.connections;
    console.log(JSON.stringify(connections));
    if(this.state.searchValue !== '') {
    const regex = new RegExp('\\b' + this.state.searchValue, 'i');
    connections = this.props.connections
    .filter(group => {
      return (regex.test(group.name) || regex.test(group.type))
    });
    }

    return (
      <div className="Groopy-connections Groopy-page">
        <div className="Groopy-page-header">
          <h2 className="form-signin-heading">Connections</h2>
          <div class="Groopy-header--actions">
            <button class="btn btn-secondary">+ Add connection</button>
          </div>
        </div>
        <hr />
        <SearchBar handleKeyPress={this.handleChange} size="m" buttonText="Search" placeholder="Filter for friends..." />
        <div className="Groopy-connections-list">
        {connections.map((user) => <ConnectionCard user={user} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    connections: state.user.connections,
    user: state.user.user,
    socket: state.chat.socket,
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToGroupTimeLine: (message, type) => dispatch(addToGroupTimeLine(message, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
