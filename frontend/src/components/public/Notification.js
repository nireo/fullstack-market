import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  const notification = props.notification;
  if (notification === null) {
    return null;
  }

  if (notification.type === 'success') {
    return <div className="alert alert-success">{notification.content}</div>;
  }

  if (notification.type === 'error') {
    return <div className="alert alert-danger">{notification.content}</div>;
  }

  return null;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
