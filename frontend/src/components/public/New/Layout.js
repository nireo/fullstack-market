import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { PostMain } from './Posts/PostMain';

// here the sidebar and content are divided
const Layout = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="wrapper">
      <Sidebar showSidebar={showSidebar} username={user.username} />
      <div id="content">
        <div className="container-fluid">
          <button
            style={{ background: 'none', color: 'inherit', border: 'none' }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="fas fa-align-left"></i>
            <span>{'  '}Toggle sidebar</span>
          </button>
        </div>
        <div style={{ paddingTop: '2rem' }}>
          <PostMain />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Layout);
