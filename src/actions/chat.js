const joinGroup = (group) => {
  return {
    type: 'JOIN_GROUP',
    group,
  }
}

const leaveGroup = (group) => {
  return {
    type: 'LEAVE_GROUP',
    group,
  }
}

const sendMessage = (e) => {
  console.log('event', e.target);
  return {
    type: 'SEND_MESSAGE',
    e,
  }
}

const loadMessages = (group) => {
  return {
    type: 'LOAD_MESSAGES',
    group,
  }
}

const selectGroup = (group) => {
  return {
    type: 'SELECT_GROUP',
    group,
  }
}

const setCurrentMessage = (event) => {
  return {
    type: 'SET_CURRENT_MESSAGE',
    event,
  }
}

module.exports = {
  joinGroup,
  leaveGroup,
  sendMessage,
  loadMessages,
  selectGroup,
  setCurrentMessage,
}
