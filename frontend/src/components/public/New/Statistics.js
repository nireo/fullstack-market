import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Statistics = ({ setShowSidebar, showSidebar }) => {
  const [showContent, setShowContent] = useState('main');

  return (
    <div>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
