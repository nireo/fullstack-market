import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers, removeUser } from '../../../reducers/allUsersReducer';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';

const UserManager = props => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, []);

  if (props.users === null) {
    return <Loading />;
  }

  const handleRemove = id => {
    if (window.confirm('Are you sure you want to delete ID: ' + id)) {
      props.removeUser(id);
    }
  };

  const filteredSearch = search
    ? props.users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      )
    : props.users;

  const renderUsers = filteredSearch.map(u => (
    <tr>
      <td>{u._id}</td>
      <td>{u.username}</td>
      <td>{u.email}</td>
      <td>{u.posts.length}</td>
      <td>{u.reviewsPosted.length}</td>
      <td>
        <Link
          class="nav-link"
          style={{ color: 'black' }}
          onClick={() => handleRemove(u._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div class="container">
      <h4>Users</h4>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search users"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
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
  { initUsers, removeUser }
)(UserManager);
