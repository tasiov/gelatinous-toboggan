/* eslint-disable new-cap */

import Immutable, { List } from 'immutable';
import { START_QUILT, RECEIVE_QUILTS } from '../constants/ActionTypes';

export default function quilts(state = List(), action) {
  switch (action.type) {
    case START_QUILT:
      return state.push(Immutable.fromJS(action.payload));
    case RECEIVE_QUILTS:
      return state.push(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}
