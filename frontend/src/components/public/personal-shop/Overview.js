import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../../reducers/allUsersReducer';
import Loading from '../../Loading';
import Pinned from './Pinned';
import Bio from './Bio';
import { Redirect } from 'react-router-dom';
import EditPersonalPage from './EditPersonalPage';
import Modal from '../../Modal';

const Overview = props => {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [changeFeatured, setChangeFeatured] = useState(false);
  const [editPinned, setEditPinned] = useState(false);
  const [editedPinned, setEditedPinned] = useState([]);

  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
    if (props.users) {
      setUser(props.users.find(u => u._id === props.id));
      if (editedPinned === []) {
        const editedPins = props.user.posts.map(item => {
          const template = {
            checked: false,
            id: item._id,
            title: item.title
          };
          return template;
        });
        setEditedPinned(editedPins);
      }
    }
  }, [props]);

  if (user === null) {
    return <Loading />;
  }

  if (user.username === 'admin') {
    return <Redirect to="/" />;
  }

  const handleClose = event => {
    event.preventDefault();
    setChangeFeatured(false);
  };

  const closePinned = event => {
    event.preventDefault();
    setEditPinned(false);
  };

  return (
    <div>
      <div
        className="jumbotron text-center"
        style={{ backgroundColor: '#4f81c7', borderRadius: '0%' }}
      >
        <h1 style={{ color: 'white' }}>{user.username}'s shop</h1>
      </div>
      <Modal show={changeFeatured} handleClose={handleClose}>
        <div className="container">
          <EditPersonalPage
            color="#4f81c7"
            oldAbout={user.personalShop.about}
          />
        </div>
      </Modal>
      <Modal show={editPinned} handleClose={closePinned}>
        <div className="container">
          <h3>Edit pinned posts</h3>
          <div className="form-check">
            <div>
              {editedPinned.map(item => (
                <div>
                  {item.title}
                  {item._id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <Pinned posts={user.posts} />
      <div className="container">
        <button
          className="button-basic button-pink"
          onClick={() => setEditPinned(true)}
        >
          Change pinned
        </button>
      </div>
      <Bio about={user.personalShop.about} id={user._id} />
      <div className="container" style={{ paddingTop: '0.5rem' }}>
        {props.user &&
          props.user._id === user._id &&
          (!showForm ? (
            <div>
              <button
                onClick={() => setChangeFeatured(true)}
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="container">
              <EditPersonalPage
                color="#4f81c7"
                oldAbout={user.personalShop.about}
              />
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => setShowForm(false)}
                  className="btn btn-primary"
                >
                  Hide form
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.allUsers,
    user: state.user
  };
};

export default connect(mapStateToProps, { initUsers })(Overview);
