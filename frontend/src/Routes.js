import React from 'react';
import NavBar from './components/public/NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/public/Login';
import Home from './components/public/Home';
import { connect } from 'react-redux';
import Signup from './components/public/Signup';
import MainPosts from './components/public/MainPost/MainPosts';
import Posts from './components/public/Community/Posts';
import Notification from './components/public/Notification';
import SinglePost from './components/public/Community/SinglePost';
import CreatePost from './components/private/CreatePost';
import CreateMainPost from './components/private/CreateMainPost';
import AdminPanel from './components/private/admin/AdminPanel';
import Users from './components/public/Users';

const Routes = props => {
  const findPostWithId = id => props.posts.find(p => p._id === id);
  const findMainPostWithId = id => props.mainPosts.find(p => p._id === id);
  return (
    <Router>
      <NavBar />
      <Notification />
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/login"
        render={() => (!props.user ? <Login /> : <Redirect to="/" />)}
      />
      <Route
        exact
        path="/signup"
        render={() => (!props.user ? <Signup /> : <Redirect to="/" />)}
      />
      <Route exact path="/official" render={() => <MainPosts />} />
      <Route exact path="/community" render={() => <Posts />} />
      <Route
        exact
        path="/community/post/:id"
        render={({ match }) =>
          !props.posts ? (
            <Posts type="community" />
          ) : (
            <SinglePost post={findPostWithId(match.params.id)} />
          )
        }
      />
      <Route
        exact
        path="/create"
        render={() => (!props.user ? <Redirect to="/" /> : <CreatePost />)}
      />
      <Route
        exact
        path="/create/main"
        render={() => {
          if (props.user) {
            if (props.user.username === 'admin') {
              return <CreateMainPost />;
            }
            return <Redirect to="/" />;
          }
          return <Redirect to="/" />;
        }}
      />
      <Route
        exact
        path="/admin"
        Users
        render={() =>
          props.user && props.user.username === 'admin' ? (
            <AdminPanel />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/official/:id"
        render={({ match }) =>
          props.mainPosts(findMainPostWithId(match.params.id))
        }
      />
      <Route exact path="/users" render={() => <Users />} />
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    posts: state.posts,
    mainPosts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  null
)(Routes);
