import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="jumbotron text-center" style={{ height: "55vh" }}>
      <h1 className="main-page-heading" style={{ fontWeight: 900 }}>
        benevol
      </h1>
      <p className="main-page-sub-heading">
        take your business to the next level
      </p>
      <p>
        <Link to="/tutorial">
          <button className="button button-animated button-pink">
            get started
          </button>
        </Link>
      </p>
    </div>
  );
};

export default Welcome;
