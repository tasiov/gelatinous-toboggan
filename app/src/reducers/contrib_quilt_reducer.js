/* eslint-disable new-cap */
import Immutable, { Map, List } from 'immutable';
import { REQUEST_ADD_QUILT, RESPONSE_ADD_QUILT } from '../constants/ActionTypes';

const initialState = Map({
  id: null,
  isSending: false,
});

export default function contribQuilt (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADD_QUILT:
      return state.merge({
        id: action.payload,
        isSending: true,
      });
    case RESPONSE_ADD_QUILT:
      return state.set('isSending', false);
    default:
      return state;
  }
}
