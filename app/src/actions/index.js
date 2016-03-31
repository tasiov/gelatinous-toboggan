/* eslint no-console: [2, { allow: ["warn", "error"] }] */
import {
  REQUEST_USER,
  RECEIVE_USER,
  SELECT_WATCH_QUILT,
  REQUEST_FRIENDS,
  RECEIVE_FRIENDS,
  REQUEST_NOTIFS,
  RECEIVE_NOTIFS,
  RECEIVE_QUILTS,
  REQUEST_QUILTS,
  RECEIVE_POST_QUILT,
  REQUEST_POST_QUILT,
  REQUEST_ADD_QUILT,
  RESPONSE_ADD_QUILT,
  CREATE_QUILT,
  REVIEW_QUILT,
  ADD_TO_QUILT,
  WATCH_QUILT,
  LOGIN_OR_SIGNUP,
  RECEIVE_USER_ERROR,
  INVITE_FRIENDS,
  RECEIVE_USERNAME_EXIST_ERROR,
  RECEIVE_USERNAME_NOT_EXIST,
  REQUEST_CONTACTS,
  RECEIVE_CONTACTS,
} from '../constants/ActionTypes';

import ip from '../config';
import Keychain from 'react-native-keychain';
import Contacts from 'react-native-contacts';
import _ from 'lodash';

export const selectLoginOrSignup = (selection) => ({
  type: LOGIN_OR_SIGNUP,
  payload: selection,
});

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

const receiveUserError = () => ({
  type: RECEIVE_USER_ERROR,
});

const receiveUsernameExistError = () => ({
  type: RECEIVE_USERNAME_EXIST_ERROR,
});

const receiveUsernameNotExist = () => ({
  type: RECEIVE_USERNAME_NOT_EXIST,
});

export function signupUser(email, password) {
  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`http://${ip}:8000/api/auth?email=${email}&password=${password}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(user => dispatch(receiveUser(user)))
    .catch(error => console.error('error', error));
  };
}

export function loginUser(usernameOrEmail, password) {
  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`http://${ip}:8000/api/auth?usernameOrEmail=${usernameOrEmail}&password=${password}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(user => dispatch(receiveUser(user)))
    .catch(error => dispatch(receiveUserError()));
  };
}

export function isLoggedIn() {
  return (dispatch) => {
    dispatch(requestUser());
    return Keychain.getInternetCredentials(`${ip}`)
      .then(credentials => dispatch(receiveUser(JSON.parse(credentials.username))))
      .catch(err => dispatch(receiveUser()));
  }
}

export function updateUser(id, data) {
  const query = Object.assign({}, data);
  delete query.token;
  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`http://${ip}:8000/api/auth?userId=${id}&token=${data.token}`, {
      method: 'PUT',
      body: JSON.stringify(query),
    })
    .then(user => {
      if (user._bodyInit) {
        console.log('user exist');
        return dispatch(receiveUsernameExistError());
      }
      return dispatch(receiveUser(data));
    })
    .catch(error => {
      console.error('error updating user:', error);
      return dispatch(receiveUserError());
    });
  };
}

export function checkUsername(id, data) {
  const query = Object.assign({}, data);
  delete query.token;
  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`http://${ip}:8000/api/user/${query.username}`)
    .then(response => response.json())
    .then(user => {
      if(user.username){
        return dispatch(receiveUsernameExistError());
      }
      return dispatch(receiveUsernameNotExist());
    })
    .catch(error => {
      console.error('error retreiving user:', error);
      return dispatch(receiveUserError());
    });
  };
}

export const reviewQuilt = (file) => ({
  type: REVIEW_QUILT,
  payload: file,
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
    return fetch(`http://${ip}:8000/api/quilt?token=${data.token}`, {
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
    dispatch(requestAddQuilt());
    return fetch(`http://${ip}:8000/api/quilt/${data.quiltId}?token=${data.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Meta-Data': JSON.stringify({
          creator: data.creator,
        }),
      },
      body: data.video,
    })
    .then(response => dispatch(responseAddQuilt(response.status)))
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
    // todo: catch errors

    return fetch(`http://${ip}:8000/api/friends/${options.id}?token=${options.token}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      console.log('friends: ', json);
      return dispatch(receiveFriends(json));
    });
  };
}

const requestContacts = () => {
  return {
    type: REQUEST_CONTACTS,
  }
}

const receiveContacts = (data) => {
  return {
    type: RECEIVE_CONTACTS,
    payload: data,
  }
}

// TODO: clean up
export function getUserContacts(token, userId) {
  return (dispatch) => {
    dispatch(requestContacts());
    return Contacts.getAll((err, contacts) => {
      if (err) {
        console.log('error', err);
      } else {
        const cleanContacts = contacts.reduce((acc, nxt) => {
          acc.push({
            fullName: `${nxt.givenName || ''} ${nxt.familyName || ''}`,
            emails: nxt.emailAddresses.map(obj => obj.email),
            phoneNumbers: nxt.phoneNumbers.map(obj => obj.number),
          });
          return acc;
        }, []);

        return fetch(`http://${ip}:8000/api/cross?userId=${userId}&token=${token}`, {
          method: 'POST',
          body: JSON.stringify(cleanContacts),
        })
        .then(response => {
          const usersInContacts = _.uniq(JSON.parse(response._bodyInit), 'username');
          dispatch(receiveContacts(usersInContacts))
        });
      }
    });
  }
}

// add authentication, dispatches
export function postFriends(userId, token, ...friendsId) {
  return (dispatch) => fetch(`http://${ip}:8000/api/friends/${userId}?token=${token}`, {
    method: 'POST',
    body: JSON.stringify({ friends: friendsId }),
  });
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
    return fetch(`http://${ip}:8000/api/quilt?username=${options.username}&token=${options.token}`)
      .then(response => response.json())
      .then(data => dispatch(receiveQuilts(data)))
      .catch(error => console.error('Error in getting user\'s quilts', error));
  };
}

const requestNotifs = () => ({
  type: REQUEST_NOTIFS,
});

const receiveNotifs = (notifs) => ({
  type: RECEIVE_NOTIFS,
  payload: notifs,
});

export function fetchNotifs(userId) {
  return (dispatch) => {
    dispatch(requestNotifs());
    return fetch(`http://${ip}:8000/api/notifications/${userId}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveNotifs(data)))
      .catch((error) => console.error('Error in getting user\'s notifications', error));
  };
}

export function selectWatchQuilt(data) {
  return {
    type: SELECT_WATCH_QUILT,
    payload: data,
  };
}

export function inviteFriends(data) {
  return {
    type: INVITE_FRIENDS,
    payload: data,
  };
}
