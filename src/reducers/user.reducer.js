const userState = {
  isLoggingIn: false,
  isAuthenticated: false,
  connections: [],
  user: [],
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
    case 'LOGIN_REQUEST':
      return {
        isLoggingIn: true, // Show a loading indicator.
        isAuthenticated: false
      }
    case 'LOGIN_FAILURE':
      return {
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.error
      }
    case 'LOGIN_SUCCESS':
      return {
        isLoggingIn: false,
        isAuthenticated: true, // Dismiss the login view.
        hash: action.hash, // Used in subsequent API requests.
        user: action.user
      }
    default:
      return state
  }
}

export default user;
