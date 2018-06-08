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

module.exports = {
  setUserGroups,
  setUserConnections,
  setUser,
}
