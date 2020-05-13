import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

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
    case GET_POST:
      return { ...state, loading: false, post: payload };
    case POST_ERROR:
      return { ...state, loading: false, error: payload };
    case ADD_POST:
      return { ...state, loading: false, posts: [payload, ...state.posts] };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
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
    case ADD_COMMENT:
      return {
        ...state, //
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => comment._id !== payload),
        },
      };
    default:
      return state;
  }
}
