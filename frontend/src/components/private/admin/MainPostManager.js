import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts, removeMainPost } from '../../../reducers/mainReducer';
import { Link } from 'react-router-dom';

const MainPostManager = props => {
  useEffect(() => {
    if (props.mainPosts === null) {
      props.initMainPosts();
    }
  }, []);
  if (props.mainPosts === null) {
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

  const handleRemove = id => {
    if (window.confirm('Are you sure you want to delete ID: ' + id)) {
      props.removeMainPost(id);
    }
  };

  const renderMainPosts = props.mainPosts.map(m => (
    <tr>
      <td>{m._id}</td>
      <td>{m.title}</td>
      <td>{m.description}</td>
      <td>{m.price}</td>
      <td>
        <Link
          class="nav-link"
          style={{ color: 'black' }}
          onClick={() => handleRemove(m._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div class="container">
      <h4>Main Posts</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderMainPosts}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mainPosts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts, removeMainPost }
)(MainPostManager);
