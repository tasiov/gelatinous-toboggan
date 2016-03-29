/* eslint-disable new-cap */

import { Map, List } from 'immutable';
import { REQUEST_NOTIFS, RECEIVE_NOTIFS } from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  notifsList: List(),
});

export default function notifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NOTIFS:
      return state.merge({ isFetching: true });
    case RECEIVE_NOTIFS:
      return state.merge({
        isFetching: false,
        notifsList: List(action.payload),
      });
    default:
      return state;
  }
}
