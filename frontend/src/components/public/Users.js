import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initUsers } from '../../reducers/allUsersReducer';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setNotification } from '../../reducers/notificationReducer';
import user from '../../services/user';
import Pagination from './Pagination';

const Users = props => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [amountInPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, [props]);

  if (props.users === null) {
    return <Loading />;
  }

  const handleSearch = async event => {
    event.preventDefault();
    setSearched(false);
    setLoading(true);
    try {
      const users = await user.searchUsers(search);
      setUsers(users);
      setLoading(false);
      setSearched(true);
      setSearchTerm(search);
    } catch {
      props.setNotification('Something went wrong with the search', 'error', 2);
      setLoading(false);
    }
  };

  const lastUserIndex = currentPage * amountInPage;
  const firstUserIndex = lastUserIndex - amountInPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users - benevol</title>
      </Helmet>
      <form onSubmit={handleSearch} style={{ marginTop: '1rem' }}>
        <div className="search">
          <input
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search for users"
            style={{
              border: '2px solid #cca8e9'
            }}
          />
          <button
            style={{ marginTop: '1rem', textAlign: 'center' }}
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div>
        {searched === true && users.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <p>No users with the found with the name: "{searchTerm}"</p>
          </div>
        )}
        {currentUsers.map(u => (
          <div>
            {u.username !== 'admin' && (
              <div
                key={u._id}
                className="card box"
                style={{ marginTop: '0.5rem' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{u.username}</h5>
                  <p className="card-text">{u.bio}</p>
                  <Link to={`/profile/${u.username}`}>
                    <button className="tutorial-button button-pink">
                      Go to profile
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
        {users.length !== 0 && (
          <div>
            <hr />
            <div className="container" style={{ paddingTop: '1rem' }}>
              <Pagination
                amountInPage={amountInPage}
                paginate={paginate}
                totalPosts={users.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.allUsers
  };
};

export default connect(mapStateToProps, { initUsers, setNotification })(Users);
