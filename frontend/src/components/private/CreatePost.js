import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../reducers/postReducer';
import { setNotification } from '../../reducers/notificationReducer';
import PostForm from './PostForm';

const CreatePost = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleCreation = event => {
    event.preventDefault();
    const newObject = {
      title,
      description,
      price
    };
    props.createPost(newObject);
    props.setNotification('Post added', 'success', 2);
  };

  return (
    <PostForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      handleCreation={handleCreation}
    />
  );
};

export default connect(
  null,
  { createPost, setNotification }
)(CreatePost);