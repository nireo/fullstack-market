import React from 'react';
import { connect } from 'react-redux';

const MainPostManager = props => {
  if (props.mainPosts === null) {
    return null;
  }
  return <div />;
};

const mapStateToProps = state => {
  return {
    mainPosts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  null
)(MainPostManager);
