import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../reducers/postReducer';
import { setNotification } from '../../reducers/notificationReducer';
import PostForm from './PostForm';
import CreatePostContent from './CreatePostContent';
import Finished from './Finished';
import Modal from '../Modal';
import Markdown from 'markdown-to-jsx';
import { Link } from 'react-router-dom';

const CreatePost = ({ createPost, setNotification }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState('');

  const handleCreation = () => {
    const newObject = {
      title,
      description,
      price,
      content
    };
    createPost(newObject);
    setNotification('Post added', 'success', 2);
  };

  const handleClose = event => {
    event.preventDefault();
    setShowPreview(false);
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: '1rem' }}>
        Step {step}: {step === 1 && 'set basic information'}
        {step === 2 && 'add content'}
        {step === 3 && 'finished'}
      </h2>
      <hr />
      {step === 1 && (
        <div>
          <PostForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            handleCreation={handleCreation}
            setStep={setStep}
            type="create"
            setShowPreview={setShowPreview}
          />
          {description !== '' && (
            <Modal show={showPreview} handleClose={handleClose}>
              <div className="container">
                <Markdown>{description}</Markdown>
              </div>
            </Modal>
          )}
          {description !== '' && (
            <div>
              <Link onClick={() => setShowPreview(true)}>Show preview</Link>
            </div>
          )}
        </div>
      )}
      {step === 2 && (
        <div>
          <CreatePostContent
            setStep={setStep}
            createPost={handleCreation}
            setContent={setContent}
            content={content}
            setShowPreview={setShowPreview}
          />
          {content !== '' && (
            <Modal show={showPreview} handleClose={handleClose}>
              <div className="container">
                <Markdown>{content}</Markdown>
              </div>
            </Modal>
          )}
        </div>
      )}
      {step === 3 && <Finished name={title} />}
    </div>
  );
};

export default connect(null, { createPost, setNotification })(CreatePost);
