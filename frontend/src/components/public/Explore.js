import React from 'react';
import { connect } from 'react-redux';
import ExploreCommunity from './explore-page/ExploreCommunity';
import ExploreOfficial from './explore-page/ExploreOfficial';

const Explore = () => {
  return (
    <div class="container" style={{ paddingTop: '2em' }}>
      <h2>Explore</h2>
      <p>
        From this page you can explore official and community postings and also
        other statistics.
      </p>
      <ExploreOfficial />
      <ExploreCommunity />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  null
)(Explore);
