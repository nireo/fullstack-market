import React, { useState } from 'react';
import PostForm from './PostForm';

const EditForm = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  if (props.post === null) {
    return <div className="container">You need to select a post</div>;
  }

  const handleEdit = event => {
    event.preventDefault();
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
    />
  );
};

export default EditForm;
