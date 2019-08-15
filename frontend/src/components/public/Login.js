import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../../reducers/userReducer';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = event => {
    event.preventDefault();
    const credentials = {
      username,
      password
    };
    props.handleLogin(credentials, rememberMe);
  };

  return (
    <div class="text-center container">
      <form onSubmit={handleLogin} class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div>
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
        <div>
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
        {props.user && <p>You're logged in</p>}
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
  null,
  { handleLogin }
)(Login);
