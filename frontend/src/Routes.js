import React from "react";
import NavBar from "./components/public/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./components/public/Login";
import Home from "./components/public/Home";
import { connect } from "react-redux";
import Signup from "./components/public/Signup";
import MainPosts from "./components/public/MainPost/MainPosts";
import Posts from "./components/public/Community/Posts";
import Notification from "./components/public/Notification";
import SinglePost from "./components/public/Community/SinglePost";
import CreatePost from "./components/private/CreatePost";
import CreateMainPost from "./components/private/CreateMainPost";
import AdminPanel from "./components/private/admin/AdminPanel";
import Users from "./components/public/Users";
import SingleUser from "./components/public/SingleUser";
import Cart from "./components/private/Cart";
import Chat from "./components/public/Chat";
import NotFound from "./components/public/NotFound";
import Explore from "./components/public/Explore";
import SingleMainPost from "./components/public/MainPost/SingleMainPost";
import { initPosts } from "./reducers/postReducer";
import { initMainPosts } from "./reducers/mainReducer";
import { initUsers } from "./reducers/allUsersReducer";
import Overview from "./components/public/personal-shop/Overview";
import EditPosts from "./components/private/EditPosts";
import OwnedItems from "./components/private/owned-items/OwnedItems";
import EditReviews from "./components/private/EditReviews";
import Tutorial from "./components/public/Tutorial/Tutorial";
import SingleReport from "./components/private/admin/Reports/SingleReport";
import ReportForm from "./components/public/ReportForm";
import SettingsMain from "./components/private/settings/SettingsMain";

const Routes = props => {
  const findPostWithId = id => {
    if (props.posts === null) {
      props.initPosts();
    }
    const post = props.posts.find(p => p._id === id);
    return post;
  };

  return (
    <Router>
      <NavBar />
      <Notification />
      <Switch>
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
              if (props.user.username === "admin") {
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
            props.user && props.user.username === "admin" ? (
              <AdminPanel />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/official/:id"
          render={({ match }) => <SingleMainPost id={match.params.id} />}
        />
        <Route exact path="/users" render={() => <Users />} />
        <Route
          exact
          path="/profile/:id"
          render={({ match }) => <SingleUser id={match.params.id} />}
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
          render={({ match }) => <SingleMainPost id={match.params.id} />}
        />
        <Route
          exact
          path="/shop/:id"
          render={({ match }) => <Overview id={match.params.id} />}
        />
        <Route
          exact
          path="/edit"
          render={() => (props.user ? <EditPosts /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/owned-items"
          render={() => (props.user ? <OwnedItems /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/edit-reviews"
          render={() => (props.user ? <EditReviews /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/report/:id"
          render={({ match }) =>
            props.user && props.user.username === "admin" ? (
              <SingleReport id={match.params.id} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/report/user/:id"
          render={({ match }) =>
            props.user ? (
              <ReportForm id={match.params.id} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/settings"
          render={() => (props.user ? <SettingsMain /> : <Redirect to="/" />)}
        />
        <Route exact path="/tutorial" render={() => <Tutorial />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.allUsers,
    posts: state.posts,
    mainPosts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts, initPosts, initUsers }
)(Routes);
