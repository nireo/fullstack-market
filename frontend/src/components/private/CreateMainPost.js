import React, { useState } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { createMainPost } from '../../reducers/mainReducer';
import { setNotification } from '../../reducers/notificationReducer';

const CreateMainPost = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleCreation = event => {
    event.preventDefault();
    const postObject = {
      title,
      description,
      price
    };
    try {
      props.createMainPost(postObject);
      props.setNotification('Main has been added', 'success', 2);
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
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
  { createMainPost, setNotification }
)(CreateMainPost);
