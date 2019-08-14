import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div class="text-center container">
      <form class="form-signin">
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
      </form>
    </div>
  );
};

export default Login;
