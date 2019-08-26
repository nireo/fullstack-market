import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../../reducers/allUsersReducer';
import Loading from '../../Loading';
import Pinned from './Pinned';
import Bio from './Bio';

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
      <div
        className="jumbotron text-center"
        style={{ backgroundColor: '#4f81c7', borderRadius: '0%' }}
      >
        <h1 style={{ color: 'white' }}>{user.username}'s shop</h1>
      </div>
      <Pinned posts={user.posts} />
      <Bio about={user.personalShop.about} />
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
