import React from 'react';
import Welcome from './components/public/Welcome';
import NavBar from './components/public/NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Welcome />
    </Router>
  );
};

export default Routes;
