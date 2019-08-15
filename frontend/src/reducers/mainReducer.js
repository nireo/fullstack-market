import mainService from '../services/mainPost';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_MAIN_POSTS':
      return action.data;
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

export default reducer;
