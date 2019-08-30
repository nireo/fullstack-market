import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';
import EditForm from './EditForm';

const EditPosts = props => {
  const [user, setUser] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
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
    <div key={p._id} className="col-md 6">
      <div className="card" style={{ marginTop: '1em' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <Link className="card-link" onClick={() => setPostToEdit(p)}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h1>Edit posts</h1>
      <div className="row">
        <div className="col-md 6">{renderPosts}</div>
        <div className="col-md 6">
          <EditForm post={postToEdit} setPost={setPostToEdit} />
        </div>
      </div>
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
