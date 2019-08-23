import React from 'react';
import { connect } from 'react-redux';

const Explore = () => {
  return (
    <div class="container" style={{ paddingTop: '2em' }}>
      <h2>Explore</h2>
      <p>
        From this page you can explore official and community postings and also
        other statistics.
      </p>
      <h3>Official</h3>
      <p>Official posts can only be posted by staff</p>
      <h3>Community</h3>
      <p>Community posts can be posted by anyone with a valid account.</p>
      <h5>Most recent community posts</h5>
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
