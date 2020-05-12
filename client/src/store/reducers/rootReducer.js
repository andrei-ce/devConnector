import { combineReducers } from 'redux';
import alert from './alert';
import profile from './profile';
import auth from './auth';
import post from './post';

const rootReducer = combineReducers({
  alert,
  auth,
  profile,
  post,
});

export default rootReducer;
