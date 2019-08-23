import React, { useState } from 'react';

const ReviewForm = () => {
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(0.0);
  return (
    <div>
      <h5>Create new review</h5>
      <form>
        <div class="from-group">
          <label>Review content</label>
          <textarea
            class="form-control"
            value={content}
            onChange={({ target }) => setContent(target.value)}
            rows="4"
          />
        </div>
        <div class="from-group" style={{ paddingTop: '1rem' }}>
          <label>Star rating</label>
          <input
            class="form-control"
            value={stars}
            type="number"
            onChange={({ target }) => setStars(target.value)}
            step={0.01}
            min={0}
            max={5}
          />
        </div>
      </form>
      <div style={{ paddingTop: '1rem' }}>
        <button class="btn btn-outline-primary" type="submit">
          Submit review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
