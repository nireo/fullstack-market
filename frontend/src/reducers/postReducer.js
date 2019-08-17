import postService from '../services/post';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.data;
    case 'CREATE_NEW_POST':
      return [...state, action.data];
    case 'REMOVE_POST':
      return state.filter(p => p._id !== action.id);
    case 'UPDATE_POST':
      return state.map(p => (p._id === action.data._id ? action.data : p));
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

export const removePost = id => {
  return async dispatch => {
    await postService.deletePost(id);
    dispatch({
      type: 'REMOVE_POST',
      id: id
    });
  };
};

export const updatePost = (id, newObject) => {
  return async dispatch => {
    const post = await postService.updatePost(id, newObject);
    dispatch({
      type: 'UPDATE_POST',
      data: post
    });
  };
};

export default reducer;
