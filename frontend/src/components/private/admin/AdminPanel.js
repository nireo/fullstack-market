import React from 'react';
import MainPostManager from './MainPostManager';
import UserManager from './UserManager';

const AdminPanel = () => {
  return (
    <div class="container">
      <h2>Admin Panel</h2>
      <MainPostManager />
      <UserManager />
    </div>
  );
};

export default AdminPanel;
