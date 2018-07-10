const joinGroup = (userId, groupId) => {
  return {
    type: 'JOIN_GROUP',
    userId,
    groupId,
  }
}

const leaveGroup = (group) => {
  return {
    type: 'LEAVE_GROUP',
    group,
  }
}

const addToGroupTimeLine = (message, type) => {
  return {
    type: 'ADD_TO_GROUP_TIMELINE',
    message,
    eventType: type,
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

const updateSocket = (socket) => {
  return {
    type: 'UPDATE_SOCKET',
    socket,
  }
}

const updateMessages = (messages) => {
  return {
    type: 'UPDATE_MESSAGES',
    messages,
  }
}

const updateCurrentGroupUsers = (users) => {
  return {
    type: 'UPDATE_CURRENT_GROUP_USERS',
    users,
  }
}

const connectUser = (userId) => {
  return {
    type: 'CONNECT_USER',
    userId,
  }
}

const logOutChat = () => {
  return {
    type: 'LOG_OUT_CHAT'
  }
}

module.exports = {
  joinGroup,
  leaveGroup,
  addToGroupTimeLine,
  loadMessages,
  selectGroup,
  connectUser,
  updateMessages,
  updateSocket,
  updateCurrentGroupUsers,
  logOutChat,
}
