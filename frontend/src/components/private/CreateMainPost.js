import React, { useState } from 'react';
import PostForm from './PostForm';

const CreateMainPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleCreation = event => {
    event.preventDefault();
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

export default CreateMainPost;
