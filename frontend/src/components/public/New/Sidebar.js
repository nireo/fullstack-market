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
              id="postDropdown"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle sidebar-link"
              onClick={() => setPageToShow('post')}
            >
              Posts
            </Link>
            <ul
              className="collapse list-unstyled"
              aria-labelledby="postDropdown"
            >
              <li>
                <Link className="sidebar-link">Create</Link>
              </li>
              <li>
                <Link className="sidebar-link">Edit</Link>
              </li>
              <li>
                <Link className="sidebar-link">Remove</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="#reviewsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle sidebar-link"
              onClick={() => setPageToShow('review')}
            >
              Reviews
            </Link>
            <ul className="collapse list-unstyled" id="reviewsSubmenu">
              <li>
                <Link className="sidebar-link">Edit</Link>
              </li>
              <li>
                <Link className="sidebar-link">Remove</Link>
              </li>
            </ul>
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
