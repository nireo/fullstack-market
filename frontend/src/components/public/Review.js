import React from 'react';

const Review = props => {
  return (
    <div className="media">
      <div className="media-body">
        <div className="row">
          <div className="col-md-9">
            <h5 className="mt-0">{props.review.title}</h5>
            {props.review.description}
          </div>
          <div className="col-md-3">
            <h6>Starts</h6>
            {props.review.stars}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
