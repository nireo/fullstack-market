import React, { useState } from "react";
import { Link } from "react-router-dom";
import Information from "./pages/Information";
import Other from "./pages/Other";

const SettingsMain = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="container">
      <h2>Settings</h2>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item" onClick={() => setPage(0)}>
            {page === 0 ? (
              <Link className="nav-link active">Information</Link>
            ) : (
              <Link className="nav-link">Information</Link>
            )}
          </li>
          <li className="nav-item" onClick={() => setPage(1)}>
            {page === 1 ? (
              <Link className="nav-link active">Other</Link>
            ) : (
              <Link className="nav-link">Other</Link>
            )}
          </li>
        </ul>
      </div>
      {page === 0 ? <Information /> : <Other />}
    </div>
  );
};

export default SettingsMain;
