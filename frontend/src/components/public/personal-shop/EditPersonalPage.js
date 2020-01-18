import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../../Loading';
import userService from '../../../services/user';
import { setNotification } from '../../../reducers/notificationReducer';
import { setNewInfo, setUserInfo } from '../../../reducers/userReducer';

const EditPersonalPage = ({
  color,
  oldAbout,
  setNotification,
  setNewInfo,
  user
}) => {
  const [newColor, setNewColor] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    if (newColor === null) {
      setNewColor(color);
    }

    if (about === null) {
      setAbout(oldAbout);
    }
  }, [about, setAbout, newColor, setNewColor, color, oldAbout]);

  if (about === null || newColor === null) {
    return <Loading />;
  }

  const updateShop = async event => {
    event.preventDefault();
    try {
      await userService.updatePersonalShop(about, newColor);
      const properties = {
        about,
        color: newColor
      };
      let newUserInfo = { ...user, personalShop: properties };
      setNotification('Successfully updated shop', 'success', 2);
    } catch {
      setNotification('Error while updating shop', 'error', 2);
    }
  };

  return (
    <div>
      <form onSubmit={updateShop}>
        <div className="form-group">
          <label>About (same as your profile)</label>
          <textarea
            className="form-control"
            value={about}
            onChange={({ target }) => setAbout(target.value)}
            rows="7"
          />
        </div>
        <div className="form-group">
          <label>Banner color</label>
          <input
            className="form-control"
            type="color"
            value={newColor}
            onChange={({ target }) => setNewColor(target.value)}
          />
        </div>
        <button className="btn btn-primary">Commit changes</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { setNotification, setNewInfo })(
  EditPersonalPage
);
