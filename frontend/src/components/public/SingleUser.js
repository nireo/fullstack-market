import React from 'react';

const SingleUser = props => {
  const renderPosts = props.user.posts.map(p => (
    <tr>
      <td>{p.title}</td>
      <td>{p.description}</td>
      <td>{p.price}</td>
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
    </div>
  );
};

export default SingleUser;
