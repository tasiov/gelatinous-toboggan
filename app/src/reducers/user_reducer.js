/* eslint-disable new-cap */
import { Map } from 'immutable';
import {
  REQUEST_USER,
  RECEIVE_USER,
  LOGIN_OR_SIGNUP,
  SET_USERNAME,
  SET_PHONE_NUMBER,
  RECEIVE_USER_ERROR,
  RECEIVE_USERNAME_EXIST_ERROR,
  RECEIVE_USERNAME_NOT_EXIST,
} from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  duplicateUsername: false,
  id: null,
  username: null,
  token: null,
  loginOrSignup: null,
  phoneNumber: null,
  email: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return state.merge({ isFetching: true, duplicateUsername: false });
    case RECEIVE_USER:
      return state.merge(Object.assign({ isFetching: false }, action.payload));
    case RECEIVE_USER_ERROR:
      return state.set('isFetching', false);
    case LOGIN_OR_SIGNUP:
      return state.set('loginOrSignup', action.payload);
    case SET_USERNAME:
      return state.set('username', action.payload);
    case SET_PHONE_NUMBER:
      return state.set('phoneNumber', action.payload);
    case RECEIVE_USERNAME_EXIST_ERROR:
      return state.merge({
        isFetching: false,
        duplicateUsername: true,
      });
    case RECEIVE_USERNAME_NOT_EXIST:
      return state.merge({
        isFetching: false,
        duplicateUsername: false,
      });
    default:
      return state;
  }
}
