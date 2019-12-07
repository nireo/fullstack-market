import React from 'react';
import CreatePost from '../../../private/CreatePost';
import EditPosts from '../../../private/EditPosts';

export const PostMain = () => {
  return (
    <div className="container-fluid" style={{ width: '100%' }}>
      <h2>Posts</h2>
      <div>
        <CreatePost />
      </div>
      <div>
        <EditPosts />
      </div>
    </div>
  );
};
