import React, { Component } from 'react';
import Avatar from './partials/Avatar';
import { selectGroup } from '../actions/chat';
import { connect } from 'react-redux';

class LinkGroup extends Component {
  renderAvatar() {
    const avatar = this.props.group.avatar;
    return avatar === undefined ?  ('') : (<Avatar image={avatar} />);
  }

  selectGroup = () => {
     this.props.selectGroup(this.props.group._id);
   }

  getClass = () =>  {
    let className = "Groopy-group ";
    console.log('RE RENDER Group!');
    console.log(this.props.currentGroup, this.props.group._id);
    className += (this.props.currentGroup !== this.props.group._id) ? '' : 'Groopy-group--selected';
    return className;
  }

  render() {
    const { name, status, type } = this.props.group;
    return (
      <div onClick={this.selectGroup} className={this.getClass()}>
        {this.renderAvatar()}
        <div className="Groopy-group__info">
          <div className="Groopy-group__title">{name}</div>
          <div className="Groopy-group__type">{type}</div>
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
