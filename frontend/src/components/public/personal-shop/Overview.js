import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../../reducers/allUsersReducer';
import Loading from '../../Loading';

const Overview = props => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
    if (props.users) {
      setUser(props.users.find(u => u._id === props.id));
    }
  }, [props]);

  if (user === null) {
    return <Loading />;
  }

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>{user.username}'s shop</h1>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.allUsers
  };
};

export default connect(
  mapStateToProps,
  { initUsers }
)(Overview);
