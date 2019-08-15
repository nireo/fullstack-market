import React from 'react';
import NavBar from './components/public/NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/public/Login';
import Home from './components/public/Home';
import { connect } from 'react-redux';
import Signup from './components/public/Signup';

const Routes = props => {
  return (
    <Router>
      <NavBar />
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
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Routes);
