import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../Loading';

const OwnedItems = ({ ownedItems }) => {
  if (ownedItems === null) {
    return <Loading />;
  }
  return (
    <div className="container">
      <h2>Owned items</h2>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.ownedItems
  };
};

export default connect(
  mapStateToProps,
  null
)(OwnedItems);
