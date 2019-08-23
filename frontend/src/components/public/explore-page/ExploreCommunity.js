import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initPosts } from '../../../reducers/postReducer';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';

const ExploreCommunity = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts();
    }
  }, []);
  if (props.posts === null) {
    return <Loading />;
  }
  // render only 3 since I want to keep the page clean
  const renderPosts = props.posts.slice(0, 3).map(p => (
    <div class="col-md-4">
      <div class="card" style={{ marginTop: '1em' }}>
        <div class="card-body">
          <h5 class="card-title">{p.title}</h5>
          <h6 class="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p class="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <Link to={`/community/post/${p._id}`} class="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));
  return (
    <div class="container">
      <h3>Community</h3>
      <p>Community posts can be posted by anyone with a valid account.</p>
      <h4>Most recent community posts</h4>
      <div class="row">{renderPosts}</div>
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
  { initPosts }
)(ExploreCommunity);
