import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Users = props => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, [props]);

  if (props.users === null) {
    return <Loading />;
  }

  const filteredSearch = search
    ? props.users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      )
    : props.users;

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users - benevol</title>
      </Helmet>
      <div className="form-group" style={{ marginTop: '1rem' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for users"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <div>
        {filteredSearch.map(u => (
          <div className="card" style={{ marginTop: '0.5rem' }}>
            <div className="card-body">
              <h5 className="card-title">{u.username}</h5>
              <p className="card-text">{u.bio}</p>
              <Link to={`/profile/${u._id}`}>
                <button className="btn btn-primary">Go to profile</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.allUsers
  };
};

export default connect(mapStateToProps, { initUsers })(Users);
