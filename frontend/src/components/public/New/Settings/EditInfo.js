import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../../../reducers/notificationReducer';
import userService from '../../../../services/user';

const EditInfo = ({ setNotification, user }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailUpdate = async event => {
    event.preventDefault();
    const newUserData = { ...user, email: newEmail };
    try {
      await userService.updateUser(user._id, newUserData);
      setNotification('Email has been successfully updated', 'success', 2);
    } catch {
      setNotification('Something went wrong while updating', 'error', 2);
    }
  };

  const handleUsernameUpdate = async event => {
    event.preventDefault();
    const newUserData = { ...user, username: newUsername };
    try {
      await userService.updateUser(user._id, newUserData);
      setNotification('Email has been successfully updated', 'success', 2);
    } catch {
      setNotification('Something went wrong while updating', 'error', 2);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="box" style={{ padding: '1rem' }}>
        <form onSubmit={handleEmailUpdate}>
          <div className="row">
            <div className="col-9">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New email"
                  value={newEmail}
                  onChange={({ target }) => setNewEmail(target.value)}
                />
              </div>
            </div>
            <div className="col-3">
              <button type="submit" className="tutorial-button button-blue">
                Change
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handleUsernameUpdate}>
          <div className="row">
            <div className="col-9">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New username"
                  value={newUsername}
                  onChange={({ target }) => setNewUsername(target.value)}
                />
              </div>
            </div>
            <div className="col-3">
              <button type="submit" className="tutorial-button button-blue">
                Change
              </button>
            </div>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col-9">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
              </div>
            </div>
            <div className="col-3">
              <button type="submit" className="tutorial-button button-blue">
                Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { setNotification })(EditInfo);
