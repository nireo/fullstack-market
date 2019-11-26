import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { initReports, removeReport } from "../../../../reducers/reportReducer";
import Loading from "../../../Loading";
import { Link } from "react-router-dom";
import { setNotification } from "../../../../reducers/notificationReducer";

const SingleReport = ({ id, reports, initReports, removeReport }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (reports === []) {
            initReports();
        }
        if (reports !== [] && loading === false && report === null) {
            setReport(reports.find(r => r._id === id));
            setLoading(true);
        }
    }, [
        reports,
        id,
        initReports,
        removeReport,
        setLoading,
        loading,
        report,
        setReport
    ]);

    if (report === null) {
        return <Loading />;
    }

    const handleRemove = id => {
        if (window.confirm(`Are you sure you want to delete ${id}`)) {
            removeReport(id);
            setNotification(`Report ID:${id} has been deleted`, "success", 2);
        }
    };

    return (
        <div className="container">
            <div>
                <p>{report.content}</p>
            </div>
            <div>
                <Link
                    onClick={() => handleRemove(id)}
                    style={{ color: "black", textDecoration: "none" }}
                >
                    Remove
                </Link>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        reports: state.reports
    };
};

export default connect(mapStateToProps, {
    initReports,
    removeReport,
    setNotification
})(SingleReport);
