import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OwnedItems = ({ user }) => {
  const [viewContent, setViewContent] = useState(null);
  if (user === null) {
    return null;
  }

  const renderCommunityItems = user.communityItemsBought.map(i => (
    <tr key={i._id}>
      <td>{i.title}</td>
      <td>{i.description.slice(0, 25)}</td>
      <td>
        <Link onClick={() => setViewContent(i)}>View content</Link>
      </td>
    </tr>
  ));

  const renderMainItems = user.mainItemsBought.map(i => (
    <tr key={i._id}>
      <td>{i.title}</td>
      <td>{i.description.slice(0, 25)}</td>
      <td>
        <Link onClick={() => setViewContent(i)}>View content</Link>
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <h2>Owned community items</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderCommunityItems}</tbody>
        </table>
      </div>
      <h2 className="mt-2">Owned official items</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderMainItems}</tbody>
        </table>
      </div>
      <div className="mt-5">
        <h3>Content preview</h3>
        <div className="text-center">
          {!viewContent ? (
            <p>No content selected</p>
          ) : (
            <div>
              <p>{viewContent.content}</p>
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => setViewContent(null)}
              >
                Hide content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(OwnedItems);
