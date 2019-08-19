import React from 'react';

const SingleUser = props => {
  const renderPosts = props.user.posts.map(p => (
    <tr>
      <td>{p.title}</td>
      <td>{p.description}</td>
      <td>{p.price}</td>
    </tr>
  ));

  const renderReviews = props.user.reviewsPosted.map(r => (
    <tr>
      <td>{r.title}</td>
      <td>{r.description}</td>
      <td>{r.stars}</td>
      <td>{r.recommend ? 'True' : 'False'}</td>
    </tr>
  ));

  return (
    <div class="container">
      <h2>{props.user.username}</h2>
      <h4>Posts</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{renderPosts}</tbody>
        </table>
      </div>
      <hr />
      <h4>Reviews</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Recommended</th>
            </tr>
          </thead>
          <tbody>{renderReviews}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleUser;
