import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const UserPosts = ({ posts }) => {
    const [amountInPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const lastPostIndex = currentPage * amountInPage;
    const firstPostIndex = lastPostIndex - amountInPage;
    const postsInPage = posts.slice(firstPostIndex, lastPostIndex);
    const paginate = pageNum => setCurrentPage(pageNum);

    return (
        <div>
            {postsInPage.map(p => (
                <div
                    className="box col-12 col-md-12 col-lg-12 mb-3"
                    style={{
                        marginTop: "0.25rem",
                        marginLeft: "0.25rem",
                        marginRight: "0.25rem"
                    }}
                    key={p.title}
                >
                    <Link to={`/community/post/${p._id}`}>
                        <h6
                            className="d-flex position-relative"
                            style={{
                                width: "100%",
                                paddingTop: "0.5rem",
                                paddingLeft: "0.5rem",
                                color: "#2196f3"
                            }}
                        >
                            {p.title}
                        </h6>
                    </Link>
                    <p
                        style={{
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem"
                        }}
                    >
                        {p.description.slice(0, 50)}
                    </p>
                </div>
            ))}
            <div className="container" style={{ paddingTop: "1rem" }}>
                <Pagination
                    amountInPage={amountInPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default UserPosts;
