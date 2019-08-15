import React from 'react';
import { connect } from 'react-redux';

const UserPublic = () => {
  return <div />;
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(UserPublic);
