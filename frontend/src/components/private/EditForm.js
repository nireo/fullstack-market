import React, { useState } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { updatePost } from '../../reducers/postReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { Link } from 'react-router-dom';

const EditForm = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contentType, setContentType] = useState('basic');
  const [content, setContent] = useState('');
  if (props.post === null) {
    return <div className="container">You need to select a post</div>;
  }

  const handleEdit = event => {
    event.preventDefault();
    const editedObject = {
      title: title ? title : null,
      description: description ? description : null,
      price: price ? price : null,
      content: content ? content : null
    };

    try {
      props.updatePost(props.post._id, editedObject);
      props.setNotification(
        'Post has been edited, and will be shown on the next load',
        'success',
        2
      );
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
  };

  return (
    <div>
      <h4>{contentType === 'basic' ? 'Basic information' : 'Post content'}</h4>
      <Link
        onClick={() => {
          if (contentType === 'basic') {
            setContentType('content');
          } else {
            setContentType('basic');
          }
        }}
      >
        {contentType === 'basic' ? 'Edit content' : 'Edit basic info'}
      </Link>
      {contentType === 'basic' ? (
        <PostForm
          handleCreation={handleEdit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          type="edit"
          setPost={props.setPost}
        />
      ) : (
        <div className="container">
          <form onSubmit={handleEdit}>
            <textarea
              className="form-control"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <button type="submit" className="btn btn-outline-primary mt-4">
              Commit changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default connect(
  null,
  { updatePost, setNotification }
)(EditForm);
