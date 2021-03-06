import loginService from '../services/login';
import { setTokens } from '../utils/helpers';

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
    let user = await loginService.login(credentials);
    user.user.token = user.token;
    if (rememberMe) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    setTokens(user.token);
    user.user.token = user.token;
    dispatch({
      type: 'LOG_IN',
      data: user.user
    });
  };
};

export const setNewInfo = user => {
  // use login since it has all the needed functionality
  return { type: 'LOG_IN', data: user };
};

export const checkLocalStorage = () => {
  return async dispatch => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const userInfoJson = JSON.parse(userInfo);
      setTokens(userInfoJson.token);
      dispatch({
        type: 'LOG_IN',
        data: userInfoJson.user
      });
    }
  };
};

export const setUserInfo = info => {
  window.localStorage.clear();

  // just so that everything doesn't reset after a reload
  window.localStorage.setItem('user', JSON.stringify(info));
  return { type: 'LOG_IN', data: info };
};

export const logOut = () => {
  window.localStorage.clear();
  return { type: 'LOG_OUT' };
};

export default reducer;
