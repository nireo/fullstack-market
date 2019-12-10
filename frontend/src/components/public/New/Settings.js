import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Information } from './Settings/Information';

const Settings = ({ setShowSidebar, showSidebar, user }) => {
  const [showContent, setShowContent] = useState('information');

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
                className={`nav-item ${
                  showContent === 'information' ? 'active' : ''
                }`}
              >
                <Link
                  onClick={() => setShowContent('information')}
                  className="nav-link"
                >
                  Information
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
              <li
                className={`nav-item ${showContent === 'bio' ? 'active' : ''}`}
              >
                <Link
                  onClick={() => setShowContent('bio')}
                  className="nav-link"
                >
                  Bio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showContent === 'information' && (
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div
            className="box"
            style={{
              padding: '1rem'
            }}
          >
            <h3>Information</h3>
            <Information user={user} />
          </div>
        </div>
      )}
      {showContent === 'edit' && <div>hello</div>}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Settings);
