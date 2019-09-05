import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import EditReviewForm from './EditReviewForm';
import reviewService from '../../services/review';

const EditReviews = ({ user, setNotification }) => {
  const [reviewToEdit, setReviewToEdit] = useState(null);
  if (user === null) {
    return null;
  }

  if (user.reviewsPosted.length === 0) {
    return (
      <div className="container text-center">
        <h2>Edit reviews</h2>
        You've got no reviews, you can review items from the official and
        community tabs.
      </div>
    );
  }

  const handleRemove = id => {
    if (window.confirm('Are you sure you want to delete ' + id)) {
      try {
        reviewService.removeReview(id);
        setNotification(
          'Review has been deleted, and will be fully removed on next reload',
          'success',
          2
        );
      } catch {
        setNotification('Something went while editing', 'error', 2);
      }
    }
  };

  const renderReviews = user.reviewsPosted.map(r => (
    <div key={r._id} className="col-md 6">
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-body">
          <h5 className="card-title">{r.title}</h5>
          <h6 className="card-subtitle">Stars: {r.stars}</h6>
          <p>{r.description}</p>
          <p>Recommended: {r.recommended ? 'Yes' : 'No'}</p>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            onClick={() => setReviewToEdit(r)}
          >
            Edit review
          </Link>
          <Link
            onClick={() => handleRemove(r._id)}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            Delete review
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h2>Edit reviews</h2>
      <p>All edits here, will be updated after reloading.</p>
      <div className="row">
        <div className="col-md 6">{renderReviews}</div>
        <div className="col-md 6">
          <EditReviewForm
            review={reviewToEdit}
            setReviewToEdit={setReviewToEdit}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { setNotification }
)(EditReviews);
