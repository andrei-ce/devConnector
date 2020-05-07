import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_NOT_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuth: null, //could be false, but we want to explicitly say it hasne ttried to authenticate yet
  loading: true,
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //WHY RETURN PAYLOAD, AND FURTHERMORE, WHY ...PAYLOAD?
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuth: true, loading: false };
    case REGISTER_FAIL:
    case USER_NOT_LOADED:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    case USER_LOADED:
      return { ...state, isAuth: true, loading: false, user: payload };
    default:
      return state;
  }
}
