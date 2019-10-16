import React from "react";

const Information = () => {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Information</h4>
        </div>
        <div className="card-body">
          <p>This is the body</p>
        </div>
      </div>
      <div className="card shadow-sm" style={{ marginTop: "3rem" }}>
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Update Information</h4>
        </div>
        <div className="card-body">
          <p>This is the body</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
