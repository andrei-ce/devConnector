import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initState = {
  loading: true,
  posts: [],
  post: null,
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case POST_ERROR:
      return { ...state, loading: false, error: payload };
    case UPDATE_LIKES: {
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.postId //
            ? { ...post, likes: payload.likes } //
            : post
        ),
      };
    }
    default:
      return state;
  }
}
