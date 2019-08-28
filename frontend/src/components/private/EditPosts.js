import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';

const EditPosts = props => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
    if (user === null && props.users) {
      setUser(props.users.find(u => u._id === props.id));
    }
  }, [props, user, setUser]);

  if (user === null) {
    return <Loading />;
  }

  if (user.posts.length === 0) {
    return (
      <div className="container text-center">
        <h2>Edit posts</h2>
        <p>
          You've no posts, you can create posts in the{' '}
          <Link to="/create">create</Link> page.
        </p>
      </div>
    );
  }

  const renderPosts = user.posts.map(p => (
    <div key={p._id} className="col-md 4">
      <div className="card" style={{ marginTop: '1em' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 250)}
          </p>
          <Link className="card-link">Edit</Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div class="container">
      <h1>Edit posts</h1>
      {renderPosts}
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
)(EditPosts);
