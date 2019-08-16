import React from 'react';

const SinglePost = props => {
  if (props.post === null) {
    return null;
  }

  return (
    <div class="container">
      <h1>{props.post.title}</h1>
      <p>{props.post.description}</p>
    </div>
  );
};

export default SinglePost;
