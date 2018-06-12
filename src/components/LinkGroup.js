import React, { Component } from 'react';
import Avatar from './partials/Avatar';
import { Link } from 'react-router-dom';
import { selectGroup, updateMessages } from '../actions/chat.action';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class LinkGroup extends Component {
  renderAvatar() {
    const avatar = this.props.group.avatar;
    return avatar === undefined ?  ('') : (<Avatar image={avatar} />);
  }

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

  selectGroup = () => {
     this.props.selectGroup(this.props.group._id);
   }

  getClass = () =>  {
    let className = "Groopy-group ";
    className += (this.props.currentGroup !== this.props.group._id) ? '' : 'Groopy-group--selected';
    return className;
  }

  getGroupTypeActions() {
    const options = [];
    switch(this.props.group.type) {
      case 'birthday':
        options.push({'text': 'Add Gift poll', 'url': '/plugin/add-poll'});
        options.push({'text': 'Expenses division', 'url': '/plugin/expenses'});
      break;
      case 'game':
        options.push({'text': 'Teams', 'url': '/plugin/teams'});
        options.push({'text': 'Game location', 'url': '/plugin/location'});
      break;
      case 'trip':
        options.push({'text': 'Add destination poll', 'url': '/plugin/add-poll'});
        options.push({'text': 'Add cars division', 'url': '/plugin/cars-division'});
        options.push({'text': 'Grocery list', 'url': '/plugin/groceries'});
        options.push({'text': 'Expenses division', 'url': '/plugin/expenses'});
      break;
    }
    options.push({'text': 'Add friends', 'url': '/groups/connections'});
    return (options.map((option) => <DropdownItem>
      <Link to={option.url}>{option.text}</Link>
    </DropdownItem>))
  }

  render() {
    const { name, status, type } = this.props.group;
    return (
      <div onClick={this.selectGroup} className={this.getClass()}>
        {this.renderAvatar()}
        <div className="Groopy-group__info">
          <div className="Groopy-group__title">{name}</div>
          <div className="Groopy-group__type">{type}</div>
          <div className="Groopy-group__actions">
            <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret color="light">
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem><Link to="/groups/status">Group information</Link></DropdownItem>
                <DropdownItem divider />
                {this.getGroupTypeActions()}
                <DropdownItem divider />
                <DropdownItem>Remove</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGroup: state.chat.currentGroup,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGroup: groupId => dispatch(selectGroup(groupId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkGroup);
