import React, { useState } from 'react';

const CreatePostContent = ({ setStep, createPost, content, setContent }) => {
  const [type, setType] = useState('text');

  const handleFunctionCall = event => {
    event.preventDefault();
    createPost();
  };

  return (
    <div className="container">
      <form onSubmit={handleFunctionCall}>
        <select className="form-control mb-3">
          <option onClick={() => setType('text')}>Description</option>
          <option onClick={() => setType('pdf')}>PDF</option>
        </select>
        {type === 'text' ? (
          <textarea
            className="form-control"
            value={content}
            onChange={({ target }) => setContent(target.value)}
            rows={7}
            required
          />
        ) : (
          <input />
        )}
        <div>
          <button
            type="submit"
            className="tutorial-button button-blue mt-3 mr-2"
            onClick={() => setStep(3)}
          >
            Create
          </button>
          <button
            className="tutorial-button button-pink mt-3 mr-2"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostContent;
