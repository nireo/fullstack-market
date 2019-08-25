import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const SingleUser = props => {
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
      <div class="container" style={{ paddingTop: '1rem' }}>
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

  const renderPosts = user.posts.map(p => (
    <tr>
      <td>{p.title}</td>
      <td>{p.description.slice(0, 100)}</td>
      <td style={{ color: 'green' }}>{p.price} $</td>
    </tr>
  ));

  const renderReviews = user.reviewsPosted.map(r => (
    <tr>
      <td>{r.title}</td>
      <td>{r.description.slice(0, 100)}</td>
      <td>{r.stars}</td>
      <td>{r.recommend ? 'True' : 'False'}</td>
    </tr>
  ));

  return (
    <div class="container">
      <h2>{user.username}</h2>
      <h4>Posts</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
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
      <div class="table-responsive">
        <table class="table table-striped table-sm">
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
    users: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  { initUsers }
)(SingleUser);
