import { combineReducers } from 'redux-immutable';
import user from './user_reducer';
import friends from './friends_reducer';
import quilts from './quilts_reducer';
<<<<<<< 6225c08c6ab8096aeef86e854b4b194ad0455dea
import currentQuilt from './current_quilt_reducer';
=======
import buildQuilt from './build_quilt_reducer';
import watchQuilt from './watch_quilt_reducer';
import contribQuilt from './contrib_quilt_reducer';
>>>>>>> fix linter issues

const rootReducer = combineReducers({
  user,
  friends,
  quilts,
  currentQuilt,
});

export default rootReducer;
