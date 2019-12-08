import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar, username }) => {
  return (
    <div>
      <nav id="sidebar" className={`${showSidebar ? '' : 'active'}`}>
        <div className="sidebar-header">
          <h3>{username}'s dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <a
              href="#postSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Posts
            </a>
            <ul className="collapse list-unstyled" id="postSubmenu">
              <li>
                <a>Create</a>
              </li>
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a>Remove</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#reviewsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Reviews
            </a>
            <ul className="collapse list-unstyled" id="reviewsSubmenu">
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a>Remove</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Statistics</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
