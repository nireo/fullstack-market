import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../reducers/userReducer';

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <strong style={{ color: '#4f81c7' }}>Benevol</strong>ant
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/explore">
              <i className="fas fa-search" /> Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/official">
              <i className="far fa-building" /> Official
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/community">
              <i className="fas fa-city" /> Community
            </Link>
          </li>
          {props.user &&
            // hide normal posts from admin since no use
            (props.user.username !== 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to={`/create`}>
                  <i className="fas fa-plus" /> Create Post
                </Link>
              </li>
            ))}
          {props.user &&
            (props.user.username === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to={`/create/main`}>
                  <i className="fas fa-plus" /> Create Post
                </Link>
              </li>
            ))}
          {props.user &&
            (props.user.username === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <i className="fas fa-chart-line" /> Admin panel
                </Link>
              </li>
            ))}
          {props.user && (
            <li className="nav-item">
              <Link className="nav-link" to="/chat">
                <i className="far fa-comments" /> Chat
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <i className="fas fa-users" /> Users
            </Link>
          </li>
        </ul>
        {!props.user ? (
          <ul className="navbar-nav">
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="signup" className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="fas fa-cart-plus" /> Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={() => props.logOut()}>
                <i className="fas fa-sign-out-alt" />
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
