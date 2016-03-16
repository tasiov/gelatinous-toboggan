import {
  SET_USER,
  START_QUILT,
  REQUEST_FRIENDS,
  // RECEIVE_FRIENDS,
  RECEIVE_QUILTS,
  REQUEST_QUILTS,
  RESPONSE_POST_QUILT,
  REQUEST_POST_QUILT,
} from '../constants/ActionTypes';

let userId = 0; // for development, should be deleted once server implemented

// dispatched at login to set the current user of the app
export const setUser = (username) => ({
  type: SET_USER,
  payload: {
    id: userId++,
    username,
  },
});

// todo: make action creators more semantic

// dispatched when quilt initially started
export const startQuilt = (data) => ({
  type: START_QUILT,
  payload: data,
});

// begin post request to send quilt to server
const requestPostQuilt = () => ({
  type: REQUEST_POST_QUILT,
});

// receive response from the server relating to post request
// todo: format response data so that status code passed
const responsePostQuilt = (data) => ({
  type: RESPONSE_POST_QUILT,
  payload: data,
});

const userQuilts = (quilts) => ({
  type: GET_USER_QUILTS,
  payload: quilts,
});

// todo: catch post request errors with additional action creator
// todo: ensure friends, title, theme data in post request
/*
data = {
  title: STRING,
  theme: STRING,
  friends: ARRAY,
  vid: STRING (base64 encoding),
}
*/
export function postQuilt(data) {
  return (dispatch) => {
    dispatch(requestPostQuilt());
    return fetch('http://10.6.30.48:8000/api/quilt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data),})
    .then(response => response.json())
    .then(data => dispatch(responsePostQuilt(data)))
    .catch(err => console.log('error', err))
  };
}

// get all users from server
const requestFriends = () => ({
  type: REQUEST_FRIENDS,
});

// uncommnet when not testing
// const receiveFriends = (friends) => ({
//   type: RECEIVE_FRIENDS,
//   payload: friends,
// });

export function fetchFriends() {
  return (dispatch) => {
    dispatch(requestFriends());

    // todo: hook up appropriately with server
    // todo: catch errors

    // return fetch('/api/friends')
    //   .then(response => response.json())
    //   .then(json => dispatch(receiveFriends(json)));

    // for testing
    return new Promise((resolve) => {
      setTimeout(() => resolve(['joe', 'katy', 'kelly', 'griffin']), 100);
    });
  };
}

const requestQuilts = () => ({
  type: REQUEST_QUILTS,
});

const receiveQuilts = (quilts) => ({
  type: RECEIVE_QUILTS,
  payload: quilts,
});

export function fetchQuilts(options) {
  return (dispatch) => {
    dispatch(requestQuilts());
    return fetch(`http://10.6.30.48:8000/api/quilt?username=${options.username}`)
      .then((response) => response.json())
      .then(data => dispatch(receiveQuilts(data)))
      .catch((error) => console.log('Error in getting user\'s quilts', error))
  };
}
