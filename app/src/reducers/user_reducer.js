/* eslint-disable new-cap */
import { Map } from 'immutable';
import { REQUEST_USER, RECEIVE_USER } from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  id: null,
  username: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return state.set('isFetching', true);
    case RECEIVE_USER:
      return state.merge(Object.assign({ isFetching: false }, action.payload));
    default:
      return state;
  }
}
