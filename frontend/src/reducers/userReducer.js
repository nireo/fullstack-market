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

export const handleLogin = (credentials, rememberMe) => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    if (rememberMe) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }

    dispatch({
      type: 'LOG_IN',
      data: user.user
    });
  };
};

export const checkLocalStorage = () => {
  return async dispatch => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const userInfoJson = JSON.parse(userInfo);
      dispatch({
        type: 'LOG_IN',
        data: userInfoJson.user
      });
    }
  };
};

export const logOut = () => {
  window.localStorage.clear();
  return { type: 'LOG_OUT' };
};

export default reducer;
