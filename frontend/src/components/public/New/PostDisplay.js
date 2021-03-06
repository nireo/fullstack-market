import React, { useState } from 'react';
import CreatePost from '../../private/CreatePost';
import { Link } from 'react-router-dom';
import EditPosts from '../../private/EditPosts';

export const PostDisplay = ({ setShowSidebar, showSidebar }) => {
  const [showContent, setShowContent] = useState('create');
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light box">
        <div className="container-fluid">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            type="button"
            id="sidebarCollapse"
            className="btn btn-dark"
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li
                className={`nav-item ${
                  showContent === 'create' ? 'active' : ''
                }`}
              >
                <Link
                  onClick={() => setShowContent('create')}
                  className="nav-link"
                >
                  Create
                </Link>
              </li>
              <li
                className={`nav-item ${showContent === 'edit' ? 'active' : ''}`}
              >
                <Link
                  onClick={() => setShowContent('edit')}
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
        {showContent === 'create' && (
          <div className="container" style={{ paddingTop: '2rem' }}>
            <div className="box" style={{ paddingBottom: '1rem' }}>
              <CreatePost />
            </div>
          </div>
        )}
        {showContent === 'edit' && <EditPosts />}
      </div>
    </div>
  );
};
