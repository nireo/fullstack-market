import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../reducers/postReducer';
import { setNotification } from '../../reducers/notificationReducer';
import PostForm from './PostForm';
import CreatePostContent from './CreatePostContent';

const CreatePost = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);

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
    <div className="container">
      <h2>
        Step {step} {step === 1 ? 'set basic information' : 'add your item'}
      </h2>
      {step === 1 ? (
        <PostForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          handleCreation={handleCreation}
          setStep={setStep}
        />
      ) : (
        <CreatePostContent setStep={setStep} />
      )}
    </div>
  );
};

export default connect(
  null,
  { createPost, setNotification }
)(CreatePost);
