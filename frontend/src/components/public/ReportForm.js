import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReportForm = ({ id }) => {
  const [content, setContent] = useState("");

  const createReport = event => {
    event.preventDefault();
  };

  return (
    <div className="container">
      Creating report for <Link>{id}</Link>
      <form onSubmit={createReport}>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={content}
            onChange={({ target }) => setContent(target.value)}
            required
            placeholder="Enter description"
            rows="5"
          />
        </div>
        <button
          style={{ marginTop: "10px", width: "100%" }}
          className="button button-pink"
          type="submit"
        >
          Create report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
