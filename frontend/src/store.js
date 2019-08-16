import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import mainReducer from './reducers/mainReducer';
import postReducer from './reducers/postReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  user: userReducer,
  mainPosts: mainReducer,
  posts: postReducer,
  notification: notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
