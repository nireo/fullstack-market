import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreatePost from '../../private/CreatePost';
import EditPosts from '../../private/EditPosts';
import { Helmet } from 'react-helmet';
import { Preview } from './Preview';
import { PostDisplay } from './PostDisplay';

// here the sidebar and content are divided
const Layout = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPostContent, setShowPostContent] = useState('create');
  const [pageToShow, setPageToShow] = useState('preview');

  return (
    <div className="wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard - benevol</title>
      </Helmet>
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
          {pageToShow === 'preview' && <Preview />}
          {showPostContent === 'create' && (
            <div className="container" style={{ paddingTop: '2rem' }}>
              <div className="box" style={{ paddingBottom: '1rem' }}>
                <CreatePost />
              </div>
            </div>
          )}
          {showPostContent === 'edit' && <EditPosts />}
        </div>
        {pageToShow === 'post' && (
          <PostDisplay
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Layout);
