const setUserGroups = (groups) => {
  return {
    type: 'SET_USER_GROUPS',
    groups,
  }
}

const setUserConnections = (connections) => {
  return {
    type: 'SET_USER_CONNECTIONS',
    connections,
  }
}

const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  }
}

const setToken = (token) => {
  return {
    type: 'LOGIN_SUCCESS',
    token,
  }
}

const logOut = (test) => {
  return {
    type: 'LOG_OUT',
    test
  }
}

module.exports = {
  setUserGroups,
  setUserConnections,
  setUser,
  setToken,
  logOut
}
