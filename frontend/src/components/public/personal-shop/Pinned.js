import React from 'react';
import { Link } from 'react-router-dom';

const Pinned = props => {
  if (props.posts === null) {
    return (
      <div className="container">
        <h4>Featured</h4>
        <p>User has no featured posts</p>
      </div>
    );
  }

  const renderPosts = props.posts.slice(0, 3).map(p => (
    <div key={p._id} className="col-md-4">
      <div className="card" style={{ marginTop: '1em' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <Link to={`/community/post/${p._id}`} className="card-link">
            Read more
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h4>Featured</h4>
      {props.posts.length === 0 ? (
        <p>User has no featured posts</p>
      ) : (
        { renderPosts }
      )}
    </div>
  );
};

export default Pinned;
