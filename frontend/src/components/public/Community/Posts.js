import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initPosts } from '../../../reducers/postReducer';

const Posts = props => {
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

  const renderPosts = props.posts.map(p => (
    <div class="card" style={{ width: '18rem' }}>
      <div class="card-body">
        <h5 class="card-title">{p.title}</h5>
        <p class="card-text">{p.content}</p>
        <Link href="#" class="card-link">
          Add to cart
        </Link>
        <Link href="#" class="card-link">
          Read more
        </Link>
      </div>
    </div>
  ));

  return <div class="container">{renderPosts}</div>;
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { initPosts }
)(Posts);
