import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar, username, setPageToShow }) => {
  return (
    <div>
      <nav id="sidebar" className={`${showSidebar ? '' : 'active'}`}>
        <div className="sidebar-header">
          <h3>{username}'s dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('preview')}
            >
              Preview
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('post')}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('review')}
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('stats')}
            >
              Statistics
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('settings')}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('owned')}
            >
              Owned
            </Link>
          </li>
          <li>
            <Link
              className="sidebar-link"
              onClick={() => setPageToShow('wishlist')}
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
