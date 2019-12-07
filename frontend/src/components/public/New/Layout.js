import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreatePost from '../../private/CreatePost';
import EditPosts from '../../private/EditPosts';

// here the sidebar and content are divided
const Layout = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPostContent, setShowPostContent] = useState('create');

  return (
    <div className="wrapper">
      <Sidebar showSidebar={showSidebar} username={user.username} />
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light box">
          <div className="container-fluid">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
            >
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto">
                <li
                  className={`nav-item ${
                    showPostContent === 'create' ? 'active' : ''
                  }`}
                >
                  <Link
                    onClick={() => setShowPostContent('create')}
                    className="nav-link"
                  >
                    Create
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    showPostContent === 'edit' ? 'active' : ''
                  }`}
                >
                  <Link
                    onClick={() => setShowPostContent('edit')}
                    className="nav-link"
                  >
                    Edit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {showPostContent === 'create' && (
            <div className="container" style={{ paddingTop: '2rem' }}>
              <div className="box" style={{ paddingBottom: '1rem' }}>
                <CreatePost />
              </div>
            </div>
          )}
          {showPostContent === 'edit' && <EditPosts />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Layout);
