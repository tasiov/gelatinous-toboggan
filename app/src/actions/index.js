/* eslint no-console: [2, { allow: ["warn", "error"] }] */
import {
  REQUEST_USER,
  RECEIVE_USER,
  // START_QUILT,
  REQUEST_FRIENDS,
  RECEIVE_FRIENDS,
  RECEIVE_QUILTS,
  REQUEST_QUILTS,
  RECEIVE_POST_QUILT,
  REQUEST_POST_QUILT,
  REQUEST_CURRENT_QUILT,
  RECEIVE_CURRENT_QUILT,
} from '../constants/ActionTypes';

// dispatched at login to set the current user of the app
const requestUser = () => ({
  type: REQUEST_USER,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

export function fetchUser(username) {
  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`http://10.6.30.48:8000/api/auth?username=${username}`)
      .then(response => response.json())
      .then(user => dispatch(receiveUser(user)))
      .catch(error => console.error('error', error));
  };
}

// todo: make action creators more semantic

// dispatched when quilt initially started
// export const startQuilt = (data) => ({
//   type: START_QUILT,
//   payload: data,
// });

// begin post request to send quilt to server
const requestPostQuilt = () => ({
  type: REQUEST_POST_QUILT,
});

// receive response from the server relating to post request
// todo: format response data so that status code passed
const responsePostQuilt = (data) => ({
  type: RECEIVE_POST_QUILT,
  payload: data,
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

// do we need seperate action creators for first vs subsequent quilts?
export function postQuilt(data) {
  return (dispatch) => {
    dispatch(requestPostQuilt());
    console.log('dispatching request');
    return fetch('http://10.6.30.77:8000/api/quilt/', {
      method: 'POST',
      body: data.video,
      headers: {
        'Content-Type': 'application/json',
        'Meta-Data': JSON.stringify({
          title: data.title,
          theme: data.theme,
          users: data.users,
          creator: data.creator,
        }),
      },
    })
    .then(response => dispatch(responsePostQuilt(response.status)))
    .catch(err => console.log('post quilt error', err));
  };
}

// get all users from server
const requestFriends = () => ({
  type: REQUEST_FRIENDS,
});

// uncommnet when not testing
const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  payload: friends,
});

export function fetchFriends(options) {
  return (dispatch) => {
    dispatch(requestFriends());

    // todo: hook up appropriately with server
    // todo: catch errors

    return fetch(`http://localhost:8000/api/friends/${options.username}`)
      .then(response => response.json())
      .then(json => dispatch(receiveFriends(json))
      );
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
    return fetch(`http://localhost:8000/api/quilt?username=${options.username}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveQuilts(data)))
      .catch((error) => console.error('Error in getting user\'s quilts', error));
  };
}

const requestWatchQuilt = () => ({
  type: REQUEST_CURRENT_QUILT,
});

const receiveWatchQuilt = (watchQuilt) => ({
  type: RECEIVE_CURRENT_QUILT,
  payload: watchQuilt,
});

export function fetchWatchQuilt(options) {
  return (dispatch) => {
    dispatch(requestWatchQuilt());
    return fetch(`http://10.6.30.48:8000/api/quilt/${options.quiltId}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveWatchQuilt(data)))
      .catch((error) => console.error('Error in getting current quilt', error));
  };
}
