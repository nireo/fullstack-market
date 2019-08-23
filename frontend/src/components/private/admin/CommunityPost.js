import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initPosts, removePost } from '../../../reducers/postReducer';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';

const CommunityPost = props => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (props.posts === null) {
      props.initPosts();
    }
  }, [props]);
  if (props.posts === null) {
    return <Loading />;
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

  const renderPosts = filteredSearch.map(p => (
    <tr>
      <td>{p._id}</td>
      <td>{p.title}</td>
      <td>{p.description.slice(0, 100)}</td>
      <td style={{ color: 'green' }}>{p.price} $</td>
      <td>
        <Link
          class="nav-link"
          style={{ color: 'black' }}
          onClick={() => handleRemove(p._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));
  return (
    <div class="container">
      <h4>Community posts</h4>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search users"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
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
  { initPosts, removePost }
)(CommunityPost);
