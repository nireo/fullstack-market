import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initMainPosts, removeMainPost } from "../../../reducers/mainReducer";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import { setNotification } from "../../../reducers/notificationReducer";
import Pagination from "../../public/Pagination";

const MainPostManager = props => {
  const [search, setSearch] = useState("");
  const [amountInPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (props.mainPosts === null) {
      props.initMainPosts();
    }
  }, [props]);
  if (props.mainPosts === null) {
    return <Loading />;
  }

  const handleRemove = id => {
    if (window.confirm("Are you sure you want to delete ID: " + id)) {
      props.removeMainPost(id);
      props.setNotification(`Post ID: ${id} has been deleted`, "success", 2);
    }
  };

  const filteredSearch = search
    ? props.mainPosts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : props.mainPosts;

  const lastPostIndex = currentPage * amountInPage;
  const firstPostIndex = lastPostIndex - amountInPage;
  const currentPosts = filteredSearch.slice(firstPostIndex, lastPostIndex);
  const paginate = pageNum => setCurrentPage(pageNum);

  const renderMainPosts = currentPosts.map(m => (
    <tr key={m._id}>
      <td>{m._id}</td>
      <td>{m.title}</td>
      <td>{m.description.slice(0, 100)}</td>
      <td style={{ color: "green" }}>{m.price} $</td>
      <td>
        <Link
          className="nav-link"
          style={{ color: "black" }}
          onClick={() => handleRemove(m._id)}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Main posts</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search main posts"
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
              <tbody>{renderMainPosts}</tbody>
            </table>
          </div>
          <hr />
          <Pagination
            amountInPage={amountInPage}
            totalPosts={currentPosts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mainPosts: state.mainPosts
  };
};

export default connect(
  mapStateToProps,
  { initMainPosts, removeMainPost, setNotification }
)(MainPostManager);
