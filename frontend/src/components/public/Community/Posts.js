import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initPosts } from '../../../reducers/postReducer';
import Loading from '../../Loading';

const Posts = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts();
    }
  }, []);

  if (props.posts === null) {
    return <Loading />;
  }

  const renderPosts = props.posts.map(p => (
    <div class="card" style={{ width: '20rem' }}>
      <div class="card-body">
        <h5 class="card-title">{p.title}</h5>
        <h6 class="card-subtitle text-muted">{p.price} $</h6>
        <p class="card-text" style={{ paddingBottom: '1rem' }}>
          {p.description}
        </p>
        <Link href="#" class="card-link">
          Add to cart
        </Link>
        <Link to={`/community/post/${p._id}`} class="card-link">
          Read more
        </Link>
      </div>
    </div>
  ));

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      {renderPosts}
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
)(Posts);
