import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initUsers } from '../../reducers/allUsersReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { removePost } from '../../reducers/postReducer';
import Loading from '../Loading';
import EditForm from './EditForm';

const EditPosts = props => {
  const [postToEdit, setPostToEdit] = useState(null);
  if (props.user === null) {
    return <Loading />;
  }

  if (props.user.posts.length === 0) {
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

  const handleDelete = id => {
    if (window.confirm('Are you sure you want delete the post')) {
      try {
        props.removePost(id);
        props.setNotification('Post has been deleted', 'success', 2);
      } catch {
        props.setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  const renderPosts = props.user.posts.map(p => (
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
          <Link className="card-link" onClick={() => handleDelete(p._id)}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h2>Edit posts</h2>
      <p>All edits here, will be updated after reloading.</p>
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
    users: state.allUsers,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { initUsers, setNotification, removePost }
)(EditPosts);
