import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initUsers } from '../../reducers/allUsersReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { removePost } from '../../reducers/postReducer';
import Loading from '../Loading';
import EditForm from './EditForm';
import Pagination from '../public/Pagination';

const EditPosts = props => {
  const [postToEdit, setPostToEdit] = useState(null);
  const [amountInPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  if (props.user === null) {
    return <Loading />;
  }

  if (props.user.posts.length === 0) {
    return (
      <div className="container text-center">
        <h2>Edit posts</h2>
        <p>
          You've got no posts, you can create posts in the{' '}
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

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = props.user.posts.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderPosts = currentPosts.map(p => (
    <div key={p._id} className="col-md-12">
      <div className="card box" style={{ marginTop: '1rem' }}>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <h6 className="card-subtitle" style={{ color: 'green' }}>
            {p.price} $
          </h6>
          <p className="card-text" style={{ paddingBottom: '1rem' }}>
            {p.description.slice(0, 100)}
          </p>
          <button
            className="tutorial-button button-blue"
            onClick={() => setPostToEdit(p)}
            style={{ marginRight: '1rem' }}
          >
            Edit
          </button>
          <button
            className="tutorial-button button-blue"
            onClick={() => handleDelete(p._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <ul className="progressbar">
        <div className="animated-text-left">
          {postToEdit === null ? (
            <li style={{ width: '50%' }} className="active">
              Select post
            </li>
          ) : (
            <li style={{ width: '50%' }}>Select post</li>
          )}
        </div>
        <div className="animated-text-right">
          {postToEdit !== null ? (
            <li style={{ width: '50%' }} className="active">
              Edit
            </li>
          ) : (
            <li style={{ width: '50%' }}>Edit</li>
          )}
        </div>
      </ul>
      <div style={{ paddingTop: '3rem' }}>
        {postToEdit === null && <div>{renderPosts}</div>}
        {postToEdit !== null && (
          <div>
            <EditForm post={postToEdit} setPost={setPostToEdit} />
          </div>
        )}
      </div>
      {postToEdit === null && (
        <div className="container" style={{ paddingTop: '1rem' }}>
          <Pagination
            amountInPage={amountInPage}
            totalPosts={props.user.posts.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.allUsers,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  initUsers,
  setNotification,
  removePost
})(EditPosts);
