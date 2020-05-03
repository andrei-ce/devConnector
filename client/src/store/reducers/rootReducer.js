import { combineReducers } from 'redux';
import alert from './alert';
import profile from './profile';
import auth from './auth';

const rootReducer = combineReducers({
  alert,
  auth,
  profile,
});

export default rootReducer;
