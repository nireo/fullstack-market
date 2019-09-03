import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { updateBio } from '../../reducers/allUsersReducer';
import { setNotification } from '../../reducers/notificationReducer';
import reviewService from '../../services/review';
import { removePost } from '../../reducers/postReducer';

const SingleUser = props => {
  const [showForm, setShowForm] = useState(false);
  const [bio, setBio] = useState('');
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, [props]);
  if (props.users === null) {
    return <Loading />;
  }

  const user = props.users.find(u => u._id === props.id);

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '1rem' }}>
        <h3>User has not been found</h3>
        <p>
          You can find the user you're looking for with the navigation bar, or
          if you're experiencing problems check the url.
        </p>
        <div>
          <Link to="/">Go home</Link>
        </div>
        <Link to="/users">Go to users page</Link>
      </div>
    );
  }

  if (user.username === 'admin') {
    return <Redirect to="/users" />;
  }

  const handlePostRemove = (id, title) => {
    if (window.confirm('Are you sure you want to delete' + title)) {
      try {
        props.removePost(id);
        props.setNotification(
          'Post has been successfully deleted',
          'success',
          3
        );
      } catch {
        props.setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  const renderPosts = user.posts.map(p => (
    <tr key={p._id}>
      <td>
        <Link to={`/community/post/${p._id}`}>{p.title}</Link>
      </td>
      <td>{p.description.slice(0, 100)}</td>
      <td style={{ color: 'green' }}>{p.price} $</td>
      {props.user._id === user._id && (
        <td>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            onClick={() => handlePostRemove(p._id, p.title)}
          >
            Delete
          </Link>
        </td>
      )}
    </tr>
  ));

  const handleReviewRemove = (id, title) => {
    if (window.confirm('Are you sure you want to delete ' + title)) {
      try {
        reviewService.removeReview(id);
        props.setNotification(
          'Review has been removed, it will updated on next reload',
          'success',
          3
        );
      } catch {
        props.setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  const renderReviews = user.reviewsPosted.map(r => (
    <tr key={r._id}>
      <td>{r.title}</td>
      <td>{r.description.slice(0, 100)}</td>
      <td>{r.stars}</td>
      <td>{r.recommend ? 'True' : 'False'}</td>
      {props.user._id === user._id && (
        <td onClick={() => handleReviewRemove(r._id, r.title)}>
          <Link style={{ color: 'black', textDecoration: 'none' }}>Delete</Link>
        </td>
      )}
    </tr>
  ));

  const handleBioUpdate = event => {
    event.preventDefault();
    if (bio === '') {
      try {
        props.updateBio(bio);
        props.setNotification('Something went wrong', 'error', 2);
      } catch {
        props.setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  return (
    <div className="container">
      <h2>{user.username}</h2>
      <p>{user.personalShop.about}</p>
      {props.user.username === user.username &&
        (!showForm ? (
          <button
            style={{ marginBottom: '1rem' }}
            class="btn btn-outline-primary btn-sm"
            onClick={() => setShowForm(true)}
          >
            Change bio
          </button>
        ) : (
          <form onSubmit={handleBioUpdate}>
            <div class="form-group">
              <label>Bio</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={({ target }) => setBio(target.value)}
                maxLength={300}
              />
            </div>
            <div class="form-group">
              <button type="submit" className="btn btn-outline-primary btn-sm">
                Change bio
              </button>{' '}
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ))}
      <h4>Posts</h4>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              {props.user._id === user._id && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>{renderPosts}</tbody>
        </table>
      </div>
      <hr />
      <h4>Reviews</h4>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Recommended</th>
              {props.user._id === user._id && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>{renderReviews}</tbody>
        </table>
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

export default connect(
  mapStateToProps,
  { initUsers, updateBio, setNotification, removePost }
)(SingleUser);
