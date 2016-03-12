import Immutable, { Map } from 'immutable';
import { SET_CURRENT_QUILT, ADD_TO_CURRENT_QUILT } from '../constants/ActionTypes';

const initialState = {
  
}

export default function(state = Map(), action) {
  switch (action.type) {
    case SET_CURRENT_QUILT:
      return Immutable.fromJS(action.payload);
    case ADD_TO_CURRENT_QUILT:
      // check to make sure this is correct
      return state.set(...action.payload);
    default:
      return state;
  }
}
