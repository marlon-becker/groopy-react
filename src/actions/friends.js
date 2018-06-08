export function fetchFriends() {
  return (dispatch, getState) => {

    dispatch(friendsRequest())

    // Notice how we grab the hash from the store:
    const hash = getState().user.hash
    return fetch(`https://httpbin.org/get/friends/`, {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject({response, json})
      }
      return json
    })
    .then(
      data => {
        // data = { friends: [ {}, {}, ... ] }
        dispatch(friendsSuccess(data.friends))
      },
      ({response, data}) => {
        dispatch(friendsFailure(data.error))

        // did our request fail because our auth credentials aren't working?
        if (response.status == 401) {
          dispatch(loginFailure(data.error))
        }
      }
    )
  }
}
