import { combineReducers } from 'redux-immutable';
import user from './user_reducer';
import friends from './friends_reducer';
import quilts from './quilts_reducer';
import buildQuilt from './build_quilt_reducer';
import watchQuilt from './watch_quilt_reducer';
import contribQuilt from './contrib_quilt_reducer'

const rootReducer = combineReducers({
  user,
  friends,
  quilts,
  buildQuilt,
  watchQuilt,
  contribQuilt,
});

export default rootReducer;
