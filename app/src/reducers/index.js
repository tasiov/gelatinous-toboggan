import { combineReducers } from 'redux-immutable';
import user from './user_reducer';
import friends from './friends_reducer';
import quilts from './quilts_reducer';
import currentQuilt from './current_quilt_reducer';
import notifs from './notifications_reducer';
import contacts from './contacts_reducer';

const rootReducer = combineReducers({
  contacts,
  currentQuilt,
  friends,
  notifs,
  quilts,
  user,
});

export default rootReducer;
