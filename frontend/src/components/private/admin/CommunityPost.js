import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initPosts, removePost } from '../../../reducers/postReducer';
import { Link } from 'react-router-dom';

const CommunityPost = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts();
    }
  }, []);
  if (props.posts === null) {
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
      props.removePost(id);
    }
  };

  const renderPosts = props.posts.map(p => (
    <tr>
      <td>{p._id}</td>
      <td>{p.title}</td>
      <td>{p.description}</td>
      <td>{p.price}</td>
      <td>
        <Link
          class="nav-link"
          style={{ color: 'black' }}
          onClick={() => handleRemove(p._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));
  return (
    <div class="container">
      <h4>Community posts</h4>
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
          <tbody>{renderPosts}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { initPosts, removePost }
)(CommunityPost);
