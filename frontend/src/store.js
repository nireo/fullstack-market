import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import mainReducer from './reducers/mainReducer';
import postReducer from './reducers/postReducer';
import notificationReducer from './reducers/notificationReducer';
import cartReducer from './reducers/cartReducer';
import allUsersReducer from './reducers/allUsersReducer';
import chatReducer from './reducers/chatReducer';
import reportReducer from './reducers/reportReducer';
import itemsReducer from './reducers/itemLengths';
import searchReducer from './reducers/searchReducer';
import messageReducer from './reducers/messageReducer';

const reducer = combineReducers({
  user: userReducer,
  mainPosts: mainReducer,
  posts: postReducer,
  notification: notificationReducer,
  cart: cartReducer,
  allUsers: allUsersReducer,
  chat: chatReducer,
  report: reportReducer,
  items: itemsReducer,
  search: searchReducer,
  messages: messageReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
