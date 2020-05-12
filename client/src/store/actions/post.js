import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
import setAuthToken from '../../utils/setAuthToken';

//Get posts
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

//Add or remove 1 like
export const updateLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { likes: res.data, postId },
    });
  } catch (err) {
    console.log('error hit');
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//This is how Brad structured it (two endpoints: 1 like and 1 unlike)

// export const removeLike = (postId) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/api/posts/unlike/${postId}`);
//     dispatch({
//       type: UPDATE_LIKES,
//       payload: {likes: res.data, postId},
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
