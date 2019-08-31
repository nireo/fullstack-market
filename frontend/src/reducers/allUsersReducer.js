import userService from '../services/user';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    case 'REMOVE_USER':
      return state.filter(u => u._id !== action.id);
    case 'UPDATE_USER':
      return state.map(u => (u._id === action.data._id ? action.data : u));
    default:
      return state;
  }
};

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.initUsers();
    dispatch({
      type: 'INIT_USERS',
      data: users
    });
  };
};

export const removeUser = id => {
  return async dispatch => {
    await userService.removeUser(id);
    dispatch({
      type: 'REMOVE_USER',
      id: id
    });
  };
};

export const updateBio = bio => {
  return async dispatch => {
    const user = await userService.updateBio(bio);
    dispatch({
      type: 'UPDATE_USERS',
      data: user
    });
  };
};

export default reducer;
