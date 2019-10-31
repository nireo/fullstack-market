import React, { useState } from "react";
import { Link } from "react-router-dom";
import Posts from "./pages/Posts";
import EditPosts from "../EditPosts";
import Reviews from "./pages/Reviews";

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
                {page === 1 && (
                    <div>
                        <Posts />
                        <div
                            className="container"
                            style={{
                                paddingTop: "2rem",
                                paddingBottom: "2rem"
                            }}
                        >
                            <div className="card shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">
                                        Manage posts
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <EditPosts />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {page === 2 && (
                    <div>
                        <Reviews />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
