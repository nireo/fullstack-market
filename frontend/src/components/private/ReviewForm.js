import React from 'react';

const ReviewForm = props => {
  return (
    <div>
      <h5>Create new review</h5>
      <form>
        <div class="form-group">
          <label>Review Title</label>
          <input
            class="form-control"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div class="from-group">
          <label>Review content</label>
          <textarea
            class="form-control"
            value={props.content}
            onChange={({ target }) => props.setContent(target.value)}
            rows="4"
          />
        </div>
        <div class="from-group" style={{ paddingTop: '1rem' }}>
          <label>Star rating</label>
          <input
            class="form-control"
            value={props.stars}
            type="number"
            onChange={({ target }) => props.setStars(target.value)}
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
