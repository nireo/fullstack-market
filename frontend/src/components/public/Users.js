import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';

const Users = props => {
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, []);
  if (props.users === null) {
    return <Loading />;
  }
  return <div />;
};

const mapStateToProps = state => {
  return {
    users: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  { initUsers }
)(Users);
