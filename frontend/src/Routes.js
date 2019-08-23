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
import SingleUser from './components/public/SingleUser';
import Cart from './components/private/Cart';
import Chat from './components/public/Chat';
import NotFound from './components/public/NotFound';
import Explore from './components/public/Explore';
import SingleMainPost from './components/public/MainPost/SingleMainPost';

const Routes = props => {
  const findPostWithId = id => props.posts.find(p => p._id === id);
  const findMainPostWithId = id => props.mainPosts.find(p => p._id === id);
  const findUserWithId = id => {
    const user = props.users.find(u => u._id === id);
    // since we don't want a public admin profile
    if (user.username === 'admin') {
      return null;
    }
    return user;
  };
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
      <Route
        exact
        path="/profile/:id"
        render={({ match }) => (
          <SingleUser user={findUserWithId(match.params.id)} />
        )}
      />
      <Route
        exact
        path="/cart"
        render={() => (props.user ? <Cart /> : <Redirect to="/" />)}
      />
      <Route
        exact
        path="/chat"
        render={() => (props.user ? <Chat /> : <Redirect to="/" />)}
      />
      <Route path="/404" render={() => <NotFound />} />
      <Route exact path="/explore" render={() => <Explore />} />
      <Route
        exact
        path="/official/post/:id"
        render={({ match }) => (
          <SingleMainPost post={findMainPostWithId(match.params.id)} />
        )}
      />
      <Redirect from="*" to="/404" />
    </Router>
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
  null
)(Routes);
