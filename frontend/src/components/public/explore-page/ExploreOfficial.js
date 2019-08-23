import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts } from '../../../reducers/mainReducer';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';

const ExploreOfficial = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initMainPosts();
    }
  }, []);
  if (props.posts === null) {
    return <Loading />;
  }

  const renderPosts = props.posts.slice(0, 3).map(p => (
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{p.title}</h5>
          <h6 class="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p class="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <Link to={`/official/post/${p._id}`} class="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ paddingBottom: '2em' }} class="container">
      <h3>Official</h3>
      <p>Official posts can only be posted by staff</p>
      <div class="row">{renderPosts}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts }
)(ExploreOfficial);
