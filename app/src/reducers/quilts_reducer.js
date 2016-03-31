/* eslint-disable new-cap */

import { Map, List } from 'immutable';
import { REQUEST_QUILTS, RECEIVE_QUILTS } from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  quiltsList: List(),
});

export default function quilts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUILTS:
      return state.merge({ isFetching: true });
    case RECEIVE_QUILTS:
      return state.merge({
        isFetching: false,
        quiltsList: List(action.payload),
      });
    default:
      return state;
  }
}
