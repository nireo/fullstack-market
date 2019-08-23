import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initMainPosts } from '../../../reducers/mainReducer';
import Loading from '../../Loading';

const ExploreOfficial = props => {
  useEffect(() => {
    if (props.posts === null) {
      props.initMainPosts();
    }
  }, []);
  if (props.mainPosts === null) {
    return <Loading />;
  }
  return (
    <div class="container">
      <h3>Official</h3>
      <p>Official posts can only be posted by staff</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts }
)(ExploreOfficial);
