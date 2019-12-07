import React from 'react';
import { Link } from 'react-router-dom';
import EditReviews from '../../EditReviews';

const Reviews = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">About creating reviews</h4>
        </div>
        <div className="card-body">
          <p>
            Reviews can only be posted on postings you own. You can post a
            review by going to the postings page, and pressing 'Create Review'.
          </p>
          <Link to="/community">
            <button className="btn btn-success">Browse posts</button>
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="card shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Manage reviews</h4>
          </div>
          <div className="card-body">
            <EditReviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
