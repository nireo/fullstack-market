import React, { useState } from 'react';
import { connect } from 'react-redux';
import reviewService from '../../services/review';
import { setNotification } from '../../reducers/notificationReducer';
import RenderStars from '../RenderStars';
import { updateReviewHelpful as r_addHelpful } from '../../reducers/postReducer';

const Review = ({ review, user, setNotification, r_addHelpful }) => {
  const [disabledButton, setDisableButton] = useState(false);
  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete ' + id)) {
      try {
        reviewService.removeReview(id);
        setNotification('Review deleted successfully', 'success', 2);
      } catch {
        setNotification('Something went wrong', 'error', 2);
      }
    }
  };

  const addHelpful = () => {
    r_addHelpful(review._id);
  };

  return (
    <div class="my-3 p-3 bg-white rounded box small">
      <div class="media text-muted pt-3">
        <p class="media-body pb-3 mb-0">
          <div className="row">
            <div className="col-md 8">
              <strong class="d-block text-gray-dark">{review.title}</strong>
              {review.description}
            </div>
            <div className="col-md 2">
              <strong class="d-block text-gray-dark">Recommended</strong>
              {review.recommended ? 'Yes' : 'No'}
            </div>
            <div className="col-md 2">
              <RenderStars stars={review.stars} />
            </div>
          </div>
        </p>
      </div>
      <p>0 people found this helpful</p>
      <div>
        <button
          className={`tutorial-button ${disabledButton ? '' : 'button-pink'}`}
          style={{ marginTop: '0' }}
          disabled={disabledButton}
          onClick={() => addHelpful()}
        >
          Helpful
        </button>
        {user && user._id === review.postedBy && (
          <button
            onClick={() => handleDelete(review._id)}
            className="tutorial-button button-pink"
            style={{ marginTop: '0', marginLeft: '1rem' }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { setNotification, r_addHelpful })(
  Review
);
