import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initUsers, removeUser } from "../../../reducers/allUsersReducer";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import Pagination from "../../public/Pagination";

const UserManager = props => {
  const [search, setSearch] = useState("");
  const [amountInPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
  }, [props]);

  if (props.users === null) {
    return <Loading />;
  }

  const handleRemove = id => {
    if (window.confirm("Are you sure you want to delete ID: " + id)) {
      props.removeUser(id);
    }
  };

  const filteredSearch = search
    ? props.users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      )
    : props.users;

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentUsers = filteredSearch.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderUsers = currentUsers.map(u => (
    <tr key={u._id}>
      <td>{u._id}</td>
      <td>{u.username}</td>
      <td>{u.email}</td>
      <td>{u.posts.length}</td>
      <td>{u.reviewsPosted.length}</td>
      <td>
        <Link
          className="nav-link"
          style={{ color: "black" }}
          onClick={() => handleRemove(u._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <h4>Users</h4>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search users"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Posts</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUsers}</tbody>
        </table>
      </div>
      <div className="container" style={{ paddingTop: "1rem" }}>
        <Pagination
          amountInPage={amountInPage}
          paginate={paginate}
          totalPosts={filteredSearch.length}
        />
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
  { initUsers, removeUser }
)(UserManager);
