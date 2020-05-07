import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

//Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/all');

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all profiles
export const getProfileById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${user_id}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get github Repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/github/${githubUsername}`);

    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update user's profile
export const updateProfile = (formData, history, edit = false) => async (dispatch) => {
  //formData will contain: name, skills, status, etc.
  //history is just to do history.push to redirect on client side
  //edit is to know if its a new profile or edit an old one

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = formData;
    const res = await axios.post('api/profile', body, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data, //entire profile is sent back
    });

    let msg = edit ? 'Profile updated!' : 'Profile created!';
    dispatch(setAlert(msg, 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    //if we forget to put the status, or have any other validation error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = formData;
    const res = await axios.put('api/profile/experience', body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    let msg = 'Experience added!';
    dispatch(setAlert(msg, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    //if we forget to put the status, or have any other validation error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = formData;
    const res = await axios.put('api/profile/education', body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    let msg = 'Education added!';
    dispatch(setAlert(msg, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    //if we forget to put the status, or have any other validation error
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    let msg = 'Experience deleted!';
    dispatch(setAlert(msg, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    let msg = 'Education deleted!';
    dispatch(setAlert(msg, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Account & Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`/api/profile/`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
