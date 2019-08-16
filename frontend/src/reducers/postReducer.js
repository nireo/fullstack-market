import postService from '../services/post';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.data;
    case 'CREATE_NEW_POST':
      return [...state, action.data];
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

export const createPost = newObject => {
  return async dispatch => {
    const post = await postService.createNewPost(newObject);
    dispatch({
      type: 'CREATE_NEW_POST',
      data: post
    });
  };
};

export default reducer;
