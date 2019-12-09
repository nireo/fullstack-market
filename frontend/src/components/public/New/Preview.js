import React from 'react';

export const Preview = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="container">
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
        </div>
      </nav>
      <div>
        <h2>Dashboard</h2>
        <p style={{ fontSize: '18px' }}>
          In this page you can manage your shop and profile. As you can see,
          there is a sidebar which you can use to navigate this site.
        </p>
      </div>
    </div>
  );
};
