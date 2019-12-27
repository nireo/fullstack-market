import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditReviews from '../../private/EditReviews';
import { connect } from 'react-redux';

const ReviewDisplay = ({ setShowSidebar, showSidebar, user }) => {
  const [showContent, setShowContent] = useState('edit');

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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li
                className={`nav-item ${showContent === 'edit' ? 'active' : ''}`}
              >
                <Link
                  onClick={() => setShowContent('edit')}
                  className="nav-link"
                >
                  Edit
                </Link>
              </li>
              <li
                className={`nav-item ${
                  showContent === 'create' ? 'active' : ''
                }`}
              >
                <Link
                  onClick={() => setShowContent('create')}
                  className="nav-link"
                >
                  Create
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showContent === 'edit' && <EditReviews />}
      {showContent === 'create' && (
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div
            className="box"
            style={{
              paddingTop: '1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            <h3>Creating reviews</h3>
            <p>
              You can add reviews only to items you have purchased. This is to
              prevent spam or bad reviews. Reviews usually contain a title,
              description, recommended field and your star rating. You should be
              as truthful as possible in your reviews. Note that reviews are not
              removed unless they are 'fake', bad quality or untruthful. Still
              adding a review is recommended.
            </p>
            <h4>Add a review.</h4>
            <p>You should add a review if you haven't already.</p>
            {user.communityItemsBought.map(i => (
              <div
                className="box"
                style={{ padding: '0.25rem 0.25rem', marginBottom: '0.5rem' }}
              >
                <div className="row">
                  <div className="col-md-9">
                    <h6>{i.title}</h6>
                    <p>{i.description.slice(0, 100)}</p>
                  </div>

                  <div className="col-md-3">
                    <Link to={`/community/post/${i._id}`}>
                      <button
                        className="tutorial-button button-blue"
                        style={{ marginTop: '0.25rem' }}
                      >
                        Add review
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(ReviewDisplay);
