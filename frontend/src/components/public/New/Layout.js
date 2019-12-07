import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';

// here the sidebar and content are divided
const Layout = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="wrapper">
      <Sidebar showSidebar={showSidebar} username={user.username} />
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              type="button"
              className="btn btn-info"
            >
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Layout);
