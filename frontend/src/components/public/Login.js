import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../../reducers/userReducer';
import { logOut } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';
import Copyright from '../Copyright';
import { Helmet } from 'react-helmet';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (props.user !== null) {
    return (
      <div className="container text-center">
        <h2>You're already logged in.</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => props.logOut()}
        >
          Log out
        </button>
      </div>
    );
  }

  const handleLogin = event => {
    event.preventDefault();
    const credentials = {
      username,
      password
    };
    try {
      props.handleLogin(credentials, rememberMe);
      props.setNotification('Logged in successfully', 'success', 2);
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
  };

  return (
    <div className="text-center container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - benevol</title>
      </Helmet>
      <form onSubmit={handleLogin} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal animate-fade-in">
          Please sign in
        </h1>
        <div className="form-group animated-text-left">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            type="text"
            className="form-control"
            placeholder="Username"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-group animated-text-right">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div className="checkbox mb-3 animate-fade-in">
          <label>
            <input
              type="checkbox"
              value={rememberMe}
              onClick={() => setRememberMe(!rememberMe)}
            />{' '}
            Remember me
          </label>
        </div>
        <div>
          <button
            className="button button-animated button-pink"
            style={{ width: '50%' }}
            type="submit"
          >
            Login
          </button>
        </div>
        <Copyright />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {
  handleLogin,
  logOut,
  setNotification
})(Login);
