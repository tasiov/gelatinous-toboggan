/* eslint-disable new-cap */
import { Map, List } from 'immutable';
import { SELECT_WATCH_QUILT } from '../constants/ActionTypes';

const initialState = Map({
  id: null,
});

export default function watchQuilt(state = initialState, action) {
  switch (action.type) {
    case SELECT_WATCH_QUILT:
      return state.set('id', action.payload);
    default:
      return state;
  }
}
