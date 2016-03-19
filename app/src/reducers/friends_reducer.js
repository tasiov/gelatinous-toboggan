/* eslint-disable new-cap */
import { List, Map } from 'immutable';
import { REQUEST_FRIENDS, RECEIVE_FRIENDS } from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  friendsList: List(),
});

// todo: add request error handling
// see: http://redux.js.org/docs/advanced/AsyncActions.html
export default function friends(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FRIENDS:
      return state.set('isFetching', true);
    case RECEIVE_FRIENDS:
      return state.merge({
        isFetching: false,
        friendsList: List(action.payload),
      });
    default:
      return state;
  }
}
