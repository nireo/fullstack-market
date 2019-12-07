import React, { useState } from 'react';
import Sidebar from './Sidebar';

// here the sidebar and content are divided
const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="wrapper">
      <Sidebar showSidebar={showSidebar} />
      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              type="button"
              id="sidebarCollapse"
              class="btn btn-info"
            >
              <i class="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
