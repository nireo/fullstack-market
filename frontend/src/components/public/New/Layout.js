import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Preview } from './Preview';
import { PostDisplay } from './PostDisplay';
import ReviewDisplay from './ReviewDisplay';
import Settings from './Settings';
import { Statistics } from './Statistics';
import { Owned } from './Owned';
import { Wishlist } from './Wishlist';

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
        <div>
          {pageToShow === 'preview' && (
            <Preview
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
          )}
        </div>
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
        {pageToShow === 'settings' && (
          <Settings showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        )}
        {pageToShow === 'stats' && (
          <Statistics
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
        {pageToShow === 'owned' && (
          <Owned
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            user={user}
          />
        )}
        {pageToShow === 'wishlist' && (
          <Wishlist
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            user={user}
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
