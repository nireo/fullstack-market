import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts } from '../../../reducers/mainReducer';
import '../../../utils/loadingBar.css';
import Loading from '../../Loading';

const MainPosts = props => {
  useEffect(() => {
    if (props.mainPost === null) {
      props.initMainPosts();
    }
  }, []);

  if (props.mainPost === null) {
    return <Loading />;
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
