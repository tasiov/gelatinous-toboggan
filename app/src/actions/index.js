/* eslint no-console: [2, { allow: ["warn", "error"] }] */
import {
  REQUEST_USER,
  RECEIVE_USER,
  SELECT_WATCH_QUILT,
  REQUEST_FRIENDS,
  RECEIVE_FRIENDS,
  RECEIVE_QUILTS,
  REQUEST_QUILTS,
  RECEIVE_POST_QUILT,
  REQUEST_POST_QUILT,
  REQUEST_ADD_QUILT,
  RESPONSE_ADD_QUILT,
  CREATE_QUILT,
  REVIEW_QUILT,
  ADD_TO_QUILT,
} from '../constants/ActionTypes';

import ip from '../config';

export const createQuilt = (data) => ({
  type: CREATE_QUILT,
  payload: data,
});

export const addToQuilt = (data) => ({
  type: ADD_TO_QUILT,
  payload: data,
});

export const watchQuilt = (data) => ({
  type: WATCH_QUILT,
  payload: data,
});

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
    return fetch(`http://${ip}:8000/api/auth?username=${username}`)
      .then(response => response.json())
      .then(user => dispatch(receiveUser(user)))
      .catch(error => console.error('error', error));
  };
}

export const reviewQuilt = (file) => ({
  type: REVIEW_QUILT,
  payload: file,
});

const cancelQuilt = () => ({
  type: CANCEL_QUILT,
});

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

export function postQuilt(data) {
  return (dispatch) => {
    dispatch(requestPostQuilt());
    return fetch(`http://${ip}:8000/api/quilt`, {
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
    .catch(err => console.error('post quilt error', err));
  };
}

export const contributeToQuilt = (id) => ({
  type: REQUEST_ADD_QUILT,
  payload: id,
});

// begin post request to send quilt to server
const requestAddQuilt = () => ({
  type: REQUEST_ADD_QUILT,
});

// receive response from the server relating to post request
// todo: format response data so that status code passed
const responseAddQuilt = () => ({
  type: RESPONSE_ADD_QUILT,
});

export function postToExistingQuilt(data) {
  return (dispatch) => {
    dispatch(requestPostQuilt());
    return fetch(`http://${ip}:8000/api/quilt/${data.quiltId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Meta-Data': JSON.stringify({
          creator: data.creator,
        }),
      },
      body: data.video,
    })
    .then(response => dispatch(responsePostQuilt(response.status)))
    .catch(err => console.error('post quilt error', err));
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

    return fetch(`http://${ip}:8000/api/friends/${options.username}`)
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
    return fetch(`http://${ip}:8000/api/quilt?username=${options.username}`, {
      headers: { authorization: options.token } })
      .then((response) => response.json())
      .then((data) => dispatch(receiveQuilts(data)))
      .catch((error) => console.error('Error in getting user\'s quilts', error));
  };
}

export function selectWatchQuilt(data) {
  return {
    type: SELECT_WATCH_QUILT,
    payload: data,
  };
}
