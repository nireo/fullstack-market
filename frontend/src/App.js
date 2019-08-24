import React, { useEffect } from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import { checkLocalStorage } from './reducers/userReducer';
import { initUsers } from './reducers/allUsersReducer';
import { initMainPosts } from './reducers/mainReducer';
import { initPosts } from './reducers/postReducer';
import './components/styles.css';

const App = props => {
  useEffect(() => {
    if (props.user === null) {
      props.checkLocalStorage();
    }
  }, []);

  return (
    <div class="animation-delays animate fadeIn">
      <Routes />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    mainPosts: state.mainPosts,
    users: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  { checkLocalStorage, initMainPosts, initPosts, initUsers }
)(App);
