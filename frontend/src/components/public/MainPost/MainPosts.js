import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts } from '../../../reducers/mainReducer';
import '../../../utils/loadingBar.css';

const MainPosts = props => {
  useEffect(() => {
    if (props.mainPost === null) {
      props.initMainPosts();
    }
  }, []);

  if (props.mainPost === null) {
    return (
      <div class="container text-center">
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      </div>
    );
  }

  return <div />;
};

const mapStateToProps = state => {
  return {
    mainPost: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts }
)(MainPosts);
