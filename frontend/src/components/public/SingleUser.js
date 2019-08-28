import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../Loading';

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

  const renderPosts = user.posts.map(p => (
    <tr key={p._id}>
      <td>
        <Link to={`/community/post/${p._id}`}>{p.title}</Link>
      </td>
      <td>{p.description.slice(0, 100)}</td>
      <td style={{ color: 'green' }}>{p.price} $</td>
    </tr>
  ));

  const renderReviews = user.reviewsPosted.map(r => (
    <tr key={r._id}>
      <td>{r.title}</td>
      <td>{r.description.slice(0, 100)}</td>
      <td>{r.stars}</td>
      <td>{r.recommend ? 'True' : 'False'}</td>
    </tr>
  ));

  const handleBioUpdate = event => {
    event.preventDefault();
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
  { initUsers }
)(SingleUser);
