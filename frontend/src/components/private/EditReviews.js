import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';
import EditReviewForm from './EditReviewForm';
import reviewService from '../../services/review';
import Pagination from '../public/Pagination';

const EditReviews = ({ user, setNotification }) => {
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [amountInPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
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

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentReviews = user.reviewsPosted.slice(
    firstPostIndex,
    lastPostIndex
  );
  const paginate = pageNum => setCurrentPage(pageNum);
  const renderReviews = currentReviews.map(r => (
    <div key={r._id}>
      <div className="card box" style={{ marginTop: '1rem' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md 9">
              <h5 className="card-title">{r.title}</h5>
              <p>{r.description}</p>
              <button
                onClick={() => setReviewToEdit(r)}
                className="tutorial-button button-blue"
                style={{
                  marginRight: '1rem'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleRemove(r._id)}
                className="tutorial-button button-blue"
              >
                Delete
              </button>
            </div>
            <div className="col-md 3">
              <h6 className="card-subtitle">Stars: {r.stars}</h6>
              <p>Recommended: {r.recommended ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <ul className="progressbar">
        <div className="animated-text-left">
          {reviewToEdit === null ? (
            <li style={{ width: '50%' }} className="active">
              Select review
            </li>
          ) : (
            <li style={{ width: '50%' }}>Select review</li>
          )}
        </div>
        <div className="animated-text-right">
          {reviewToEdit !== null ? (
            <li style={{ width: '50%' }} className="active">
              Edit
            </li>
          ) : (
            <li style={{ width: '50%' }}>Edit</li>
          )}
        </div>
      </ul>
      {reviewToEdit === null && <div>{renderReviews}</div>}
      {reviewToEdit !== null && (
        <div>
          <EditReviewForm
            review={reviewToEdit}
            setReviewToEdit={setReviewToEdit}
          />
        </div>
      )}
      {reviewToEdit === null && (
        <div className="container" style={{ paddingTop: '1rem' }}>
          <Pagination
            amountInPage={amountInPage}
            totalPosts={user.reviewsPosted.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { setNotification })(EditReviews);
