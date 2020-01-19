import React from 'react';
import { Link } from 'react-router-dom';

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
          <h2 style={{ paddingBottom: '1rem' }}>Your wishlist</h2>
          <div>
            {user.wishlist.map(i => (
              <div
                key={i._id}
                className="box container"
                style={{
                  marginBottom: '1rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem'
                }}
              >
                <h6 className="d-flex position-relative">{i.title}</h6>
                <p>{i.description.slice(0, 100)}</p>
                <Link
                  to={`/community/post/${i._id}`}
                  style={{ paddingBottom: '1rem' }}
                >
                  View post
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
