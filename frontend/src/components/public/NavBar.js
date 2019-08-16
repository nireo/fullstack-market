import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = props => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">
        <strong style={{ color: '#4f81c7' }}>Benevol</strong>ant
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/explore">
              Explore
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/official">
              Official
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/community">
              Community
            </Link>
          </li>
          {props.user && (
            <li class="nav-item">
              <Link class="nav-link" to="/profile">
                My Profile
              </Link>
            </li>
          )}
        </ul>
        {!props.user ? (
          <div>
            <Link to="/login">
              <button class="btn btn-outline-secondary my-2 my-sm-0">
                Login
              </button>
            </Link>
            <Link to="signup">
              <button class="btn btn-outline-primary my-2 my-sm-0">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <button class="btn btn-outline-primary my-2 my-sm-0">Log out</button>
        )}
      </div>
    </nav>
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
)(NavBar);
