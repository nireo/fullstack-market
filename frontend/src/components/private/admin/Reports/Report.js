import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initReports, removeReport } from "../../../../reducers/reportReducer";
import { Link } from "react-router-dom";
import { setNotification } from "../../../../reducers/notificationReducer";

const Report = ({ reports, initReports, removeReport, setNotification }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (reports === [] && loaded === false) {
      initReports();
      setLoaded(true);
    }
  }, [reports, setLoaded, loaded, initReports]);

  if (reports === [] && loaded === false) {
    return <Loading />;
  }

  if (reports === [] && loaded === true) {
    <p>Yay!!!, no reports</p>;
  }

  const handleRemove = id => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      removeReport(id);
      setNotification(`Report ID:${id} has been deleted`, "success", 2);
    }
  };

  // reported users and users reporting will be viewed from the single report page
  return (
    <div>
      <h4>Reports</h4>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r._id}>
                  <td>{r._id}</td>
                  <td>{r.content}</td>
                  <td>
                    <Link
                      onClick={() => handleRemove(r._id)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Delete
                    </Link>
                    <Link
                      to={`/report/${r._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Read more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    reports: state.reports
  };
};

export default connect(
  mapStateToProps,
  { initReports, removeReport, setNotification }
)(Report);
