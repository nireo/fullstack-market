import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import mainReducer from './reducers/mainReducer';

const reducer = combineReducers({
  user: userReducer,
  mainPosts: mainReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
