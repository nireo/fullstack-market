import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initPosts, removePost } from '../../../reducers/postReducer';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import Pagination from '../../public/Pagination';
import { Helmet } from 'react-helmet';

const CommunityPost = props => {
  const [search, setSearch] = useState('');
  const [amountInPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesWithContent, setPagesWithContent] = useState([]);
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts(String(currentPage));
      setPagesWithContent(pagesWithContent.concat(currentPage));
    }

    if (!pagesWithContent.includes(currentPage)) {
      props.initPosts(String(currentPage));
      setPagesWithContent(pagesWithContent.concat(currentPage));
    }
  }, [props, currentPage, pagesWithContent]);
  if (props.posts === null) {
    return <Loading />;
  }

  if (props.posts.length === 0) {
    return (
      <div className="container">
        <h2 className="mt-2">No posts found</h2>
        <p>
          No posts have been found. Please look at the main tab for more posts.
        </p>
      </div>
    );
  }

  const handleRemove = id => {
    if (window.confirm('Are you sure you want to delete ID: ' + id)) {
      props.removePost(id);
    }
  };

  const filteredSearch = search
    ? props.posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : props.posts;

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = filteredSearch.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderPosts = currentPosts.map(p => (
    <tr key={p._id}>
      <td>{p._id}</td>
      <td>{p.title}</td>
      <td>{p.description.slice(0, 100)}</td>
      <td style={{ color: 'green' }}>{p.price} $</td>
      <td>
        <Link
          className="nav-link"
          style={{ color: 'black' }}
          onClick={() => handleRemove(p._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="container" style={{ marginTop: '1.5rem' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community - benevol</title>
      </Helmet>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Community posts</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search posts"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderPosts}</tbody>
            </table>
          </div>
          <hr />
          <div className="container">
            <Pagination
              amountInPage={amountInPage}
              totalPosts={filteredSearch.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps, { initPosts, removePost })(
  CommunityPost
);
