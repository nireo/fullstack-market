import React, { useState } from 'react';

const CreatePostContent = props => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text');
  return (
    <div className="container">
      <form>
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
      </form>

      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => props.setStep(1)}
      >
        Back
      </button>
    </div>
  );
};

export default CreatePostContent;
