/* eslint-disable new-cap */
import { List, Map } from 'immutable';
import { REQUEST_CONTACTS, RECEIVE_CONTACTS } from '../constants/ActionTypes';

const initialState = Map({
  isFetching: false,
  contactList: List(),
});

export default function friends(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CONTACTS:
      return state.set('isFetching', true);
    case RECEIVE_CONTACTS:
      return state.merge({
        isFetching: false,
        contactList: List(action.payload),
      });
    default:
      return state;
  }
}
