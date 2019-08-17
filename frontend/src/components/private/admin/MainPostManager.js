import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts } from '../../../reducers/mainReducer';

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

  const renderMainPosts = props.mainPosts.map(m => (
    <tr>
      <td>{m._id}</td>
      <td>{m.title}</td>
      <td>{m.description}</td>
      <td>{m.price}</td>
      <td>
        <button class="nav-link">Delete</button>
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
  { initMainPosts }
)(MainPostManager);