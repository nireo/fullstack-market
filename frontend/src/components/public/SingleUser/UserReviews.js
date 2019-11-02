import React, { useState } from "react";
import Pagination from "../Pagination";

const UserReviews = ({ reviews }) => {
    const [amountInPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const lastReviewIndex = currentPage * amountInPage;
    const firstReviewIndex = lastReviewIndex - amountInPage;
    const reviewsInPage = reviews.slice(firstReviewIndex, lastReviewIndex);
    const paginate = pageNum => setCurrentPage(pageNum);

    return (
        <div>
            {reviewsInPage.map(r => (
                <div
                    className="box col-12 col-md-12 col-lg-12 mb-3"
                    style={{
                        marginTop: "0.25rem",
                        marginLeft: "0.25rem",
                        marginRight: "0.25rem"
                    }}
                    key={r._id}
                >
                    <h6
                        className="d-flex position-relative"
                        style={{
                            width: "100%",
                            paddingTop: "0.5rem",
                            paddingLeft: "0.5rem",
                            color: "#2196f3"
                        }}
                    >
                        {r.title}
                    </h6>
                    <p
                        style={{
                            paddingLeft: "0.5rem",
                            paddingRight: "0.5rem"
                        }}
                    >
                        {r.description.slice(0, 50)}
                    </p>
                </div>
            ))}
            <div className="container" style={{ marginTop: "1rem" }}>
                <Pagination
                    amountInPage={amountInPage}
                    totalPosts={reviews.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default UserReviews;
