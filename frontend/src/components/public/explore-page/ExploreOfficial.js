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
  }, [props]);
  if (props.posts === null) {
    return <Loading />;
  }

  const renderPosts = props.posts.slice(0, 3).map(p => (
    <div key={p._id} className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <Link to={`/official/post/${p._id}`} className="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ paddingBottom: '2em' }} className="container">
      <h3>Official</h3>
      <p>Official posts can only be posted by staff</p>
      <div className="row">{renderPosts}</div>
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
