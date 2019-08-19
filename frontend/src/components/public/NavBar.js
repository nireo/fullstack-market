import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../reducers/userReducer';

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
              <i class="fas fa-search" /> Explore
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/official">
              <i class="far fa-building" /> Official
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/community">
              <i class="fas fa-city" /> Community
            </Link>
          </li>
          {props.user &&
            // hide normal posts from admin since no use
            (props.user.username !== 'admin' && (
              <li class="nav-item">
                <Link class="nav-link" to={`/create`}>
                  <i class="fas fa-plus" /> Create Post
                </Link>
              </li>
            ))}
          {props.user &&
            (props.user.username === 'admin' && (
              <li class="nav-item">
                <Link class="nav-link" to={`/create/main`}>
                  <i class="fas fa-plus" /> Create Post
                </Link>
              </li>
            ))}
          {props.user &&
            (props.user.username === 'admin' && (
              <li class="nav-item">
                <Link class="nav-link" to="/admin">
                  <i class="fas fa-chart-line" /> Admin panel
                </Link>
              </li>
            ))}
          <li class="nav-item">
            <Link class="nav-link" to="/users">
              <i class="fas fa-users" /> Users
            </Link>
          </li>
        </ul>
        {!props.user ? (
          <ul class="navbar-nav">
            <li>
              <Link to="/login" class="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="signup" class="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        ) : (
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/cart">
                <i class="fas fa-cart-plus" /> Cart
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" onClick={() => props.logOut()}>
                <i class="fas fa-sign-out-alt" />
                Sign out
              </Link>
            </li>
          </ul>
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
  { logOut }
)(NavBar);
