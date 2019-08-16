import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../../reducers/userReducer';
import { logOut } from '../../reducers/userReducer';
import { setNotification } from '../../reducers/notificationReducer';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (props.user !== null) {
    return (
      <div class="container text-center">
        <h2>You're already logged in.</h2>
        <button class="btn btn-outline-primary" onClick={() => props.logOut()}>
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
    props.handleLogin(credentials, rememberMe);
    props.setNotification('Successfully logged in', 'success', 4);
  };

  return (
    <div class="text-center container">
      <form onSubmit={handleLogin} class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div class="form-group">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            type="text"
            class="form-control"
            placeholder="Username"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div class="form-group">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            type="password"
            class="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <div class="checkbox mb-3">
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
            style={{ width: '50%', display: 'inline-block' }}
            class="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Login
          </button>
        </div>
        <p class="mt-5 mb-3 text-muted">&copy;2019 Benelov Software</p>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { handleLogin, logOut, setNotification }
)(Login);
