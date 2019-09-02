import React from 'react';

const Review = props => {
  return (
    <div className="media mb-4">
      <div className="media-body">
        <div className="row">
          <div className="col-md-8">
            <h5 className="mt-0">{props.review.title}</h5>
            {props.review.description}
          </div>
          <div className="col-md-2">
            <h6>Stars</h6>
            {props.review.stars}
          </div>
          <div className="col-md-2">
            <h6>Recommended</h6>
            {props.review.recommended ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
