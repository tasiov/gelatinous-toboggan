/* eslint-disable new-cap */
import Immutable, { Map, List } from 'immutable';
import { REQUEST_CURRENT_QUILT, RECEIVE_CURRENT_QUILT } from '../constants/ActionTypes';

const initialState = Map({
  title: '',
  theme: '',
  users: List(),
  video: null,
  isFetching: false,
});

export default function watchQuilt(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CURRENT_QUILT:
      return initialState.merge({ isFetching: true }); // clear current quilt
    case RECEIVE_CURRENT_QUILT:
      return state.merge(Object.assign({ isFetching: false }, action.payload));
    default:
      return state;
  }
}
