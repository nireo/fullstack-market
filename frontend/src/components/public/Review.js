import React from 'react';

const Review = props => {
  return (
    <div class="media">
      <div class="media-body">
        <div class="row">
          <div class="col-md-9">
            <h5 class="mt-0">{props.review.title}</h5>
            {props.review.description}
          </div>
          <div class="col-md-3">
            <h6>Starts</h6>
            {props.review.stars}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
