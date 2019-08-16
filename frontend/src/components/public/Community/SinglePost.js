import React from 'react';

const SinglePost = props => {
  if (props.post === null) {
    return null;
  }

  return (
    <div class="container" style={{ paddingTop: '1rem' }}>
      <div class="row">
        <div class="col">
          <h1>{props.post.title}</h1>
          <h3 class="text-muted">{props.post.price} $</h3>
          <p>{props.post.description}</p>
        </div>
        <div class="col">
          <div class="card" style={{ width: '15rem' }}>
            <div class="card-body">
              <h5 class="card-title">Posted by</h5>
              <h6 class="card-subtitle text-muted">
                {props.post.postedBy.username}
              </h6>
              <div class="row" style={{ paddingTop: '1rem' }}>
                <div class="col">
                  <h6 style={{ color: '#4f81c7' }}>Posts</h6>
                  {props.post.postedBy.posts.length}
                </div>
                <div class="col">
                  <h6 style={{ color: '#4f81c7' }}>Reviews</h6>
                  {props.post.postedBy.reviewsPosted.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
