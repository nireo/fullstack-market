import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

const Users = props => {
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, [props]);

  if (props.users === null) {
    return <Loading />;
  }

  const renderUsers = props.users.map(u => {
    if (u.username === 'admin') {
      return null;
    }
    return (
      <tr>
        <td>
          <Link to={`/profile/${u._id}`}>{u.username}</Link>
        </td>
        <td>{u.posts.length}</td>
        <td>{u.reviewsPosted.length}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <h4>Users</h4>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Username</th>
              <th>Posts</th>
              <th>Reviews</th>
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
)(Users);
