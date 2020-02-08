import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchForItem, clearSearch } from '../../../reducers/searchReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Pagination from '../Pagination';

const Search = ({ items, searchForItem, setNotification, clearSearch }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [amountInPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  if (!items) {
    return null;
  }

  const handleSearch = event => {
    event.preventDefault();
    setSearched(false);
    setLoading(true);
    try {
      searchForItem(search);
      setLoading(false);
      setSearched(true);
    } catch {
      setNotification('Something went wrong with the search', 'error', 2);
      setLoading(false);
    }
  };

  const clearResults = event => {
    event.preventDefault();
    clearSearch();
  };

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = items.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search - benevol</title>
      </Helmet>
      <form onSubmit={handleSearch} style={{ marginTop: '1rem' }}>
        <div className="search">
          <input
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search for items"
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
      <div style={{ marginTop: '2rem' }}>
        {items.length === 0
          ? searched === true && (
              <div>
                <p>No postings found.</p>
              </div>
            )
          : currentPosts[0].map(i => (
              <div
                key={i._id}
                className="card"
                style={{ marginTop: '0.5rem ' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{i.title}</h5>
                  <p className="card-text">{i.description.slice(0, 150)}</p>
                  <Link to={`/community/post/${i._id}`}>
                    <button className="tutorial-button button-pink">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        {loading && <Loading />}
      </div>
      {items.length > 0 && (
        <div>
          <button
            onClick={clearResults}
            className="tutorial-button button-pink"
          >
            Clear results
          </button>
        </div>
      )}
      {items.length !== 0 && (
        <div>
          <hr />
          <div className="container" style={{ marginTop: '1rem' }}>
            <Pagination
              amountInPage={amountInPage}
              paginate={paginate}
              totalPosts={items[0].length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.search
  };
};

export default connect(mapStateToProps, {
  searchForItem,
  setNotification,
  clearSearch
})(Search);
