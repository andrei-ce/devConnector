import axios from 'axios';

import { GET_PROFILE, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

//Get current user's profile
export const getCurrentProfile = (...something) => async (dispatch) => {
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

    let msg = edit ? 'Profile Updated' : 'Profile Created';
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
