import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');
socket.on('error', function (err) {
  console.log('received socket error:')
  console.log(err)
})

const chatState = {
  socket,
  groups: [],
  messages: [],
  currentMessage: '',
  currentGroup: null,
  groups: [],
}

function chat(state = chatState, action) {
  switch(action.type) {
    case 'SET_USER_GROUPS':
      return {
        ...state,
        groups: action.groups
      }
    case 'JOIN_GROUP':
    state.socket.emit('join', action.group);
    console.log(action.group);
      return {
        ...state
      }
    case 'LEAVE_GROUP':
    state.socket.emit('leave', action.group);

    console.log(action.group);
      return {
        ...state
      }
    case 'SEND_MESSAGE':
    state.socket.emit('message', state.currentMessage, state.currentGroup);
    console.log(action);
      return {
        ...state
      }
    case 'SET_CURRENT_MESSAGE':
    console.log(action.event.target.value);
      return {
        ...state,
        currentMessage: action.event.target.value
      }
    case 'LOAD_MESSAGES':
      console.log(action)
      return {
        ...state,
        messages: action.messages
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
