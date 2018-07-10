import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/user.action';
import { logOutChat } from '../actions/chat.action';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Header extends Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  logout = () => {
    this.props.logOut();
    this.props.logOutChat();
  }

  dropDownOptions() {
    if (!this.props.isAuthenticated) {
      return (
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
    );
    } else {
      return (
        <ul>
          <li><Link to="/groups">My events</Link></li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/groups/new">Create new event</Link></li>
          <li><button onClick={this.logout} className="btn btn-secondary">logout</button></li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
      <nav className="Groopy-header">
      <div className="Groopy-logo"></div>
      <div className="Groopy-header--options">
      {this.dropDownOptions()}
      </div>
    </nav>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    logOutChat: () => dispatch(logOutChat()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
