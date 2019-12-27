import React from 'react';

export const Wishlist = ({ showSidebar, setShowSidebar, user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light box">
        <div className="container-fluid">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            type="button"
            id="sidebarCollapse"
            className="btn btn-dark"
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
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="box" style={{ padding: '1rem' }}>
          <h2>Your wishlist</h2>
        </div>
      </div>
    </div>
  );
};
