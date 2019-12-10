import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateBio } from '../../../../reducers/allUsersReducer';
import { setNotification } from '../../../../reducers/notificationReducer';

const Bio = ({ user, setNotification, updateBio }) => {
  const [newBio, setNewBio] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      if (loaded === false && newBio === '') {
        setNewBio(user.about);
      }
    }
  }, [user, setNewBio, newBio, loaded, setLoaded]);

  const handleBioUpdate = event => {
    event.preventDefault();

    if (newBio !== '') {
      try {
        updateBio(newBio);
        setNotification('Bio has been changed', 'success', 2);
      } catch {
        setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="box" style={{ padding: '1rem' }}>
        <form onSubmit={handleBioUpdate}>
          <div className="form-group">
            <label>New bio</label>
            <textarea
              className="form-control"
              value={newBio}
              onChange={({ target }) => {
                setNewBio(target.value);
              }}
              maxLength={300}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="tutorial-button button-bluish">
              Change bio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateBio, setNotification })(Bio);
