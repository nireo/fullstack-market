import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import mainReducer from './reducers/mainReducer';
import postReducer from './reducers/postReducer';
import notificationReducer from './reducers/notificationReducer';
import cartReducer from './reducers/cartReducer';
import allUsersReducer from './reducers/allUsersReducer';
import chatReducer from './reducers/chatReducer';
import ownedItemsReducer from './reducers/ownedItemsReducer';

const reducer = combineReducers({
  user: userReducer,
  mainPosts: mainReducer,
  posts: postReducer,
  notification: notificationReducer,
  cart: cartReducer,
  allUsers: allUsersReducer,
  chat: chatReducer,
  ownedItems: ownedItemsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
