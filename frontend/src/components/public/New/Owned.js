import React, { useState } from 'react';
import Modal from '../../Modal';
import { Link } from 'react-router-dom';

export const Owned = ({ setShowSidebar, showSidebar, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [viewContent, setViewContent] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

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
        {viewContent && (
          <Modal show={showModal} handleClose={handleClose}>
            <div className="container">
              <h4>{viewContent.title}</h4>
              <p>{viewContent.content}</p>
            </div>
          </Modal>
        )}
        <div className="box" style={{ padding: '1rem' }}>
          <h2 style={{ paddingBottom: '1rem' }}>Owned items</h2>
          <div>
            {user.communityItemsBought.map(i => (
              <div
                key={i._id}
                className="box container"
                style={{
                  marginBottom: '1rem',
                  paddingTop: '1rem',
                  paddingLeft: '1rem'
                }}
              >
                <h6 className="d-flex position-relative">{i.title}</h6>
                <p>{i.description.slice(0, 50)}</p>
                <Link
                  style={{ marginBottom: '0.5rem', marginTop: '0' }}
                  onClick={() => {
                    setShowModal(true);
                    setViewContent(i);
                  }}
                  className="tutorial-button button-pink"
                >
                  View content
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
