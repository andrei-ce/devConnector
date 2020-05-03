import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initState = {
  profile: null, //one complete profile showing
  profiles: [], //a list of developers
  repos: [], //when we make a call to github API, we need a place to store them
  loading: true,
  error: {}, //in case of any errors with the profile reducer/call/load etc.
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    default:
      return state;
  }
}
