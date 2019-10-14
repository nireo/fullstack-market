import React, { useState } from "react";
import MainPostManager from "./MainPostManager";
import UserManager from "./UserManager";
import CommunityPost from "./CommunityPost";
import Report from "./Reports/Report";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item" onClick={() => setPage(0)}>
            {page === 0 ? (
              <Link className="nav-link active">Items</Link>
            ) : (
              <Link className="nav-link">Items</Link>
            )}
          </li>
          <li className="nav-item" onClick={() => setPage(1)}>
            {page === 1 ? (
              <Link className="nav-link active">Reports</Link>
            ) : (
              <Link className="nav-link">Reports</Link>
            )}
          </li>
        </ul>
      </div>
      {page === 0 ? (
        <div>
          <MainPostManager />
          <UserManager />
          <CommunityPost />
        </div>
      ) : (
        <div>
          <Report />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
