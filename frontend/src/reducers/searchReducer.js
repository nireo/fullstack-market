import post from '../services/post';
import user from '../services/user';

let initialState = {
  userSearch: [],
  postSearch: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POST_SEARCH':
      let withPost = state;
      withPost.postSearch = action.data;
      return withPost;
    case 'SET_USER_SEARCH':
      let withUser = state;
      withPost.userSearch = action.data;
      return withUser;
    case 'CLEAR_SEARCH':
      return [];
    default:
      return state;
  }
};

export const searchForItem = search => {
  return async dispatch => {
    const results = await post.searchPosts(search);
    dispatch({
      type: 'SET_POST_SEARCH',
      data: results
    });
  };
};

export const searchForUser = search => {
  return async dispatch => {
    const results = await user.searchUsers(search);
    dispatch({
      type: 'SET_USER_SEARCH',
      data: results
    });
  };
};

export const clearSearch = () => {
  return { type: 'CLEAR_SEARCH' };
};

export default reducer;
