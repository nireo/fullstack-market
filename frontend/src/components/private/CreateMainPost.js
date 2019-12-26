import React, { useState } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { createMainPost } from '../../reducers/mainReducer';
import { setNotification } from '../../reducers/notificationReducer';
import CreatePostContent from './CreatePostContent';

const CreateMainPost = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);

  const handleCreation = content => {
    const postObject = {
      title,
      description,
      price,
      content
    };
    try {
      props.createMainPost(postObject);
      props.setNotification('Main has been added', 'success', 2);
    } catch {
      props.setNotification('Something went wrong', 'error', 2);
    }
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
        <CreatePostContent setStep={setStep} createPost={handleCreation} />
      )}
    </div>
  );
};

export default connect(null, { createMainPost, setNotification })(
  CreateMainPost
);
