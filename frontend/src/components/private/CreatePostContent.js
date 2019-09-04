import React, { useState } from 'react';

const CreatePostContent = ({ setStep, createPost }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text');

  const handleFunctionCall = event => {
    event.preventDefault();
    createPost(text);
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
            value={text}
            onChange={({ target }) => setText(target.value)}
            rows={7}
            required
          />
        ) : (
          <input />
        )}
        <div>
          <button type="submit" className="btn btn-outline-primary mt-3">
            Create
          </button>
          <button
            className="btn btn-outline-danger mt-3"
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
