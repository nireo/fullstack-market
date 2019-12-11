import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../reducers/userReducer';

const NavBar = props => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (props.cart !== null) {
      setTotal(
        props.cart.reduce((acc, obj) => {
          return acc + obj.price;
        }, 0)
      );
    }
  }, [props]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand mb-0 h1" to="/">
          <strong style={{ color: '#aa96da' }}>benevol</strong>
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
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="exploreDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search" /> Explore
              </Link>
              <div className="dropdown-menu" aria-labelledby="exploreDropdown">
                <Link className="dropdown-item" to="/search">
                  <i className="fas fa-search" /> Search
                </Link>
                <Link className="dropdown-item" to="/official">
                  <i className="far fa-building" /> Official
                </Link>
                <Link className="dropdown-item" to="/community">
                  <i className="fas fa-city" /> Community
                </Link>
                <Link className="dropdown-item" to="/users">
                  <i className="fas fa-users" /> Users
                </Link>
              </div>
            </li>
            {props.user && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" /> {props.user.username}
                </Link>
                <div className="dropdown-menu" aria-labelledby="userDropdown">
                  {props.user.username === 'admin' ? (
                    <Link className="dropdown-item" to="/create/main">
                      <i className="fas fa-plus" /> Create Post
                    </Link>
                  ) : (
                    <Link className="dropdown-item" to={`/create`}>
                      <i className="fas fa-plus" /> Create Post
                    </Link>
                  )}
                  {props.user.username === 'admin' && (
                    <Link className="dropdown-item" to="/admin">
                      <i className="fas fa-chart-line" /> Admin panel
                    </Link>
                  )}
                  {props.user.username !== 'admin' && (
                    <Link
                      className="dropdown-item"
                      to={`/shop/${props.user._id}`}
                    >
                      <i class="fas fa-store"></i> Personal store
                    </Link>
                  )}
                  {props.user.username !== 'admin' && (
                    <Link className="dropdown-item" to={'/owned-items'}>
                      <i class="fas fa-archive"></i> Owned items
                    </Link>
                  )}
                  {props.user.username !== 'admin' && (
                    <Link
                      className="dropdown-item"
                      to={`/profile/${props.user._id}`}
                    >
                      <i className="fas fa-user"></i> My Profile
                    </Link>
                  )}
                  {props.user.username !== 'admin' && (
                    <Link className="dropdown-item" to="/dashboard">
                      <i class="fas fa-chart-line"></i> Dashboard
                    </Link>
                  )}
                  {props.user.username !== 'admin' && (
                    <Link className="dropdown-item" to="/new">
                      New
                    </Link>
                  )}
                </div>
              </li>
            )}
            {props.user && (
              <li className="nav-item">
                <Link className="nav-link" to="/chat">
                  <i className="far fa-comments" /> Chat
                </Link>
              </li>
            )}
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
                  Sign in
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="messageDropdown"
                >
                  <i class="fas fa-bell"></i>
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="messageDropdown"
                >
                  <p className="dropdown-item disabled">
                    {props.messages.length} new notifications
                  </p>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/message-panel">
                    Message panel
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="cartDropdown"
                >
                  <i className="fas fa-cart-plus" />
                </Link>
                <div className="dropdown-menu" aria-labelledby="cartDropdown">
                  <Link to="/cart" className="dropdown-item">
                    Go to cart
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item disabled">
                    Total: {total} $
                  </Link>
                  <Link className="dropdown-item disabled">
                    {props.cart ? `Items ${props.cart.length}` : 'Cart empty'}
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => props.logOut()}>
                  <i className="fas fa-sign-out-alt" />
                  {'  '}Sign out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart,
    messages: state.messages
  };
};

export default connect(mapStateToProps, { logOut })(NavBar);
