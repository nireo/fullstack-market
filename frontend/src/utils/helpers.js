import userService from '../services/user';
import reviewService from '../services/review';
import postService from '../services/post';
import mainService from '../services/mainPost';

export const setTokens = token => {
  userService.setToken(token);
  reviewService.setToken(token);
  postService.setToken(token);
  mainService.setToken(token);
};
