import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../../Loading';
import { initItems } from '../../../reducers/ownedItemsReducer';

const OwnedItems = props => {
  useEffect(() => {
    if (props.ownedItems === null) {
      props.initItems();
    }
  }, [props]);
  if (props.ownedItems === null) {
    return <Loading />;
  }
  return (
    <div className="container">
      <h2>Owned items</h2>
      <h3 className="mt-3">Community</h3>
      <ul>
        {props.ownedItems.community.map(i => (
          <li>{i.title}</li>
        ))}
      </ul>
      <h3 className="mt-3">Official</h3>
      {props.ownedItems.main.map(i => (
        <li>{i.title}</li>
      ))}
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
