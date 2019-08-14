import loginService from '../services/login';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export const handleLogin = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    dispatch({
      type: 'LOG_IN',
      data: user.user
    });
  };
};

export default reducer;
