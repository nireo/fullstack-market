import React from 'react';
import Welcome from './components/public/Welcome';
import NavBar from './components/public/NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/public/Login';

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" render={() => <Welcome />} />
      <Route exact path="/login" render={() => <Login />} />
    </Router>
  );
};

export default Routes;
