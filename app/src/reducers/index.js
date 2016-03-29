import { combineReducers } from 'redux-immutable';
import user from './user_reducer';
import friends from './friends_reducer';
import quilts from './quilts_reducer';
import currentQuilt from './current_quilt_reducer';
import notifs from './notifications_reducer';

const rootReducer = combineReducers({
  user,
  friends,
  quilts,
  currentQuilt,
  notifs,
});

export default rootReducer;
