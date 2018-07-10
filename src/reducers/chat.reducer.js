
const chatState = {
  socket: null,
  groups: [],
  messages: [],
  groupUsers: [],
  currentMessage: '',
  currentGroup: null,
  groups: [],
}

function chat(state = chatState, action) {
  switch(action.type) {
    case 'CONNECT_USER':
      state.socket.emit('connectUser', action.userId);
      return state;
    case 'UPDATE_SOCKET':
      return {
        ...state,
        socket: action.socket
      }
    case 'SET_USER_GROUPS':
      return {
        ...state,
        groups: action.groups
      }
    case 'JOIN_GROUP':
    state.socket.emit('join', action.userId, action.groupId);
      return {
        ...state
      }
    case 'LEAVE_GROUP':
    state.socket.emit('leave', action.group);
      return {
        ...state
      }
    case 'ADD_TO_GROUP_TIMELINE':
    state.socket.emit('addToGroupTimeline', action.message, action.eventType, state.currentGroup);
      return {
        ...state
      }
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: action.messages
      }
    case 'UPDATE_CURRENT_GROUP_USERS':
      return {
        ...state,
        groupUsers: action.users
      }
    case 'LOG_OUT_CHAT':
    state.socket.emit('disconnect');
      return {
        state
      }
    case 'SELECT_GROUP':
      for(let group in state.groups) {
        state.groups[group] = Object.assign({}, state.groups[group])
        if(state.groups[group]._id == action.group) {
          state.groups[group].selected = true;
        } else {
          state.groups[group].selected = false;
        }
      }
      state.socket.emit('getCurrentGroupMessages', action.group);
      state.socket.emit('getCurrentGroupUsers', action.group);

      return {
        ...state,
        currentGroup: action.group,
        groups: state.groups
      }
    default:
      return state
  }
}

export default chat;
