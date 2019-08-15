import postService from '../services/post';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.data;
    default:
      return state;
  }
};

export const initPosts = () => {
  return async dispatch => {
    const posts = await postService.getAllPosts();
    dispatch({
      type: 'INIT_POSTS',
      data: posts
    });
  };
};

export default reducer;
