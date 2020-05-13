import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';
import setAuthToken from '../../utils/setAuthToken';

//Get posts==============================================================
export const getPosts = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add or remove 1 like===================================================
export const updateLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, postId },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//remove post===========================================================
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add post==============================================================
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let body = formData; //its an object

  try {
    const res = await axios.post('/api/posts', body, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post added!', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get 1 post===========================================================
export const getPost = (postId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add comment==========================================================
export const addComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let body = formData; //its an object

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment added!', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete comment========================================================
export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId, //here, generally we input things we need to manipulate in the UI (here we need to remove the UI)
    });
    dispatch(setAlert('Comment removed!', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
