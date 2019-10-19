import React from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Create post</h4>
        </div>
        <div className="card-body">
          <p>You can create more posts.</p>
          <Link to="/create">
            <button className="btn btn-success">Create</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Posts;
