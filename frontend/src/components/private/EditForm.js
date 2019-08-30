import React, { useState } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { updatePost } from '../../reducers/postReducer';
import { setNotification } from '../../reducers/notificationReducer';

const EditForm = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  if (props.post === null) {
    return <div className="container">You need to select a post</div>;
  }

  const handleEdit = event => {
    event.preventDefault();
    const editedObject = {
      title: title ? title : null,
      description: description ? description : null,
      price: price ? price : null
    };
    try {
      props.updatePost(props.post._id, editedObject);
      props.setNotification('Post has been edited', 'success', 2);
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
  };

  return (
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
  );
};

export default connect(
  null,
  { updatePost, setNotification }
)(EditForm);
