import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreatePost from '../../private/CreatePost';
import EditPosts from '../../private/EditPosts';
import { Helmet } from 'react-helmet';
import { Preview } from './Preview';
import { PostDisplay } from './PostDisplay';
import { ReviewDisplay } from './ReviewDisplay';

// here the sidebar and content are divided
const Layout = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageToShow, setPageToShow] = useState('preview');

  return (
    <div className="wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard - benevol</title>
      </Helmet>
      <Sidebar
        showSidebar={showSidebar}
        username={user.username}
        setPageToShow={setPageToShow}
      />
      <div id="content">
        <div>{pageToShow === 'preview' && <Preview />}</div>
        {pageToShow === 'post' && (
          <PostDisplay
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
          />
        )}
        {pageToShow === 'review' && (
          <ReviewDisplay
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
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
