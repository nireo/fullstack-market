import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';

const EditReviewForm = ({ review, setReviewToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (
      title === '' &&
      description === '' &&
      recommended === false &&
      stars === 0 &&
      review !== null
    ) {
      setTitle(review.title);
      setDescription(review.description);
      setRecommended(review.recommended);
      setStars(review.stars);
    }
  }, [review]);

  if (review === null) {
    return null;
  }

  const handleEdit = event => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleEdit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div className="form-group">
          <label>Stars</label>
          <input
            type="number"
            className="form-control"
            value={stars}
            max={5}
            min={0}
            onChange={({ target }) => setStars(target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              value={recommended}
              onClick={() => setRecommended(!recommended)}
            />
            {'   '}
            Recommend
          </label>
        </div>
        <div>
          <button className="btn btn-outline-primary" type="submit">
            Commit changes
          </button>
          {'  '}
          <button
            className="btn btn-outline-danger"
            onClick={() => setReviewToEdit(null)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { setNotification }
)(EditReviewForm);
