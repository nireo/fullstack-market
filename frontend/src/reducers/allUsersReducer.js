import userService from '../services/user';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
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

export default reducer;
