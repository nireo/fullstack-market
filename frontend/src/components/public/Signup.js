import React, { useState } from 'react';
import userService from '../../services/user';
import { connect } from 'react-redux';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  if (props.user !== null) {
    return null;
  }

  const handleSignup = event => {
    event.preventDefault();
    if (email === '' || username === '' || confirm === '' || password === '') {
      return null;
    }

    const credentials = {
      email,
      username,
      password
    };
    if (password === confirm) {
      userService.makeNewUser(credentials);
    }
  };

  return (
    <div className="text-center container">
      <form onSubmit={handleSignup} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
        <div className="form-group">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            className="form-control"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <input
            style={{ width: '50%', display: 'inline-block' }}
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={({ target }) => setConfirm(target.value)}
          />
        </div>
        <div>
          <button
            style={{ width: '50%', display: 'inline-block' }}
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Signup
          </button>
        </div>
        <p className="mt-5 mb-3 text-muted">&copy;2019 Benelov Software</p>
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
  null
)(Signup);
