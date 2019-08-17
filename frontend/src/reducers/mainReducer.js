import mainService from '../services/mainPost';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_MAIN_POSTS':
      return action.data;
    case 'REMOVE_MAIN_POST':
      return state.filter(p => p._id !== action.id);
    case 'CREATE_MAIN_POST':
      return [...state, action.data];
    case 'UPDATE_MAIN_POST':
      return state.map(p => (p.id === action.data._id ? action.data : p));
    default:
      return state;
  }
};

export const initMainPosts = () => {
  return async dispatch => {
    const posts = await mainService.getMainPosts();
    dispatch({
      type: 'INIT_MAIN_POSTS',
      data: posts
    });
  };
};

export const removeMainPost = id => {
  return async dispatch => {
    await mainService.deleteMainPost(id);
    dispatch({
      type: 'REMOVE_MAIN_POST',
      id: id
    });
  };
};

export const createMainPost = newObject => {
  return async dispatch => {
    const post = await mainService.createMainPost(newObject);
    dispatch({
      type: 'CREATE_MAIN_POST',
      data: post
    });
  };
};

export const updateMainPost = (id, newObject) => {
  return async dispatch => {
    const post = await mainService.updateMainPost(id, newObject);
    dispatch({
      type: 'UPDATE_MAIN_POSTS',
      data: post
    });
  };
};

export default reducer;
