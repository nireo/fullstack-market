import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item" onClick={() => setPage(1)}>
            {page === 1 ? (
              <Link className="nav-link active">Posts</Link>
            ) : (
              <Link className="nav-link">Posts</Link>
            )}
          </li>
          <li className="nav-item" onClick={() => setPage(2)}>
            {page === 2 ? (
              <Link className="nav-link active">Reviews</Link>
            ) : (
              <Link className="nav-link">Reviews</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
