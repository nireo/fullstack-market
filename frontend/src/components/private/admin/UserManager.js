import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../../reducers/allUsersReducer';
import { Link } from 'react-router-dom';

const UserManager = props => {
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, []);

  if (props.users === null) {
    return (
      <div class="container text-center">
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      </div>
    );
  }

  const renderUsers = props.users.map(u => (
    <tr>
      <td>{u._id}</td>
      <td>{u.username}</td>
      <td>{u.email}</td>
      <td>{u.posts.length}</td>
      <td>{u.reviewsPosted.length}</td>
      <td>
        <Link class="nav-link">Delete</Link>
      </td>
    </tr>
  ));

  return (
    <div class="container">
      <h2>Users</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Posts</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUsers}</tbody>
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
)(UserManager);
