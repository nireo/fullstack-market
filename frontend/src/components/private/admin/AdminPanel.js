import React from 'react';
import MainPostManager from './MainPostManager';
import UserManager from './UserManager';
import CommunityPost from './CommunityPost';

const AdminPanel = () => {
  return (
    <div class="container">
      <h2>Admin Panel</h2>
      <hr />
      <MainPostManager />
      <UserManager />
      <CommunityPost />
    </div>
  );
};

export default AdminPanel;
