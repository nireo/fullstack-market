import React from 'react';

const Review = ({ review }) => {
  return (
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <div class="media text-muted pt-3">
        <p class="media-body pb-3 mb-0 small lh-125">
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
              <strong class="d-block text-gray-dark">Stars</strong>
              {review.stars}
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Review;
