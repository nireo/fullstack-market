import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../reducers/notificationReducer';

const EditReviews = ({ user }) => {
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

  const renderReviews = user.reviewsPosted.map(r => (
    <div key={r._id} className="col-md 6">
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-body">
          <h5 className="card-title">{r.title}</h5>
          <h6 className="card-subtitle">{r.stars}</h6>
          <p>{r.description}</p>
          <p>Recommended: {r.recommended ? 'Yes' : 'No'}</p>
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
