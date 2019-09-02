import React from 'react';

const ReviewForm = props => {
  const handleReview = event => {
    event.preventDefault();
    const reviewObject = {
      title: props.title,
      description: props.content,
      stars: props.stars,
      recommended: props.recommended
    };
    props.addReview(reviewObject);
  };
  return (
    <div>
      <h5>Create new review</h5>
      <form onSubmit={handleReview}>
        <div className="form-group">
          <label>Review Title</label>
          <input
            className="form-control"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div className="from-group">
          <label>Review content</label>
          <textarea
            className="form-control"
            value={props.content}
            onChange={({ target }) => props.setContent(target.value)}
            rows="4"
          />
        </div>
        <div className="form-group" style={{ paddingTop: '1rem' }}>
          <label>Star rating</label>
          <input
            className="form-control"
            value={props.stars}
            type="number"
            onChange={({ target }) => props.setStars(target.value)}
            step={0.01}
            min={0}
            max={5}
          />
        </div>
        <div className="form-group" style={{ paddingTop: '1rem' }}>
          <label>
            <input
              type="checkbox"
              value={props.recommend}
              onClick={() => props.setRecommended(!props.recommend)}
            />{' '}
            Recommend
          </label>
        </div>
        <div style={{ paddingTop: '1rem' }}>
          <button className="btn btn-outline-primary" type="submit">
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
