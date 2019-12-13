import React, { useState } from 'react';
import Modal from '../../Modal';

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
          <h2>Owned items</h2>
          <div>
            {user.communityItemsBought.map(i => (
              <div key={i._id} className="box" style={{ margin: '0.5rem' }}>
                <h6
                  className="d-flex position-relative"
                  style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}
                >
                  {i.title}
                </h6>
                <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                  {i.description.slice(0, 50)}
                </p>
                <button
                  className="button-blue size-small"
                  style={{
                    border: 'none',
                    padding: '2px 4px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    borderRadius: '5px',
                    marginBottom: '0.25rem'
                  }}
                  onClick={() => {
                    setShowModal(true);
                    setViewContent(i);
                  }}
                >
                  View Content
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
