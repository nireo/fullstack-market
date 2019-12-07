import React from 'react';

const Sidebar = ({ showSidebar, username }) => {
  return (
    <div>
      <nav id="sidebar" className={`${showSidebar ? '' : 'active'}`}>
        <div className="sidebar-header">
          <h3>{username}'s dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <a href="#">All</a>
          </li>
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
                <a href="#">Create</a>
              </li>
              <li>
                <a href="#">Edit</a>
              </li>
              <li>
                <a href="#">Remove</a>
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
                <a href="#">Edit</a>
              </li>
              <li>
                <a href="#">Remove</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
