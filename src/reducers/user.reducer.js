const userState = {
  isLoggingIn: false,
  isAuthenticated: false,
  connections: [],
  user: [],
  token: ''
}

function user(state = userState, action) {
  switch(action.type) {
    case 'SET_USER_CONNECTIONS':
      return {
        ...state,
        connections: action.connections
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false, // Dismiss the login view.
        token: '', // Used in subsequent API requests.
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        error: action.error
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true, // Dismiss the login view.
        token: action.token, // Used in subsequent API requests.
      }
    default:
      return state
  }
}

export default user;
