import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initUsers } from "../../reducers/allUsersReducer";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Loading";
import { updateBio } from "../../reducers/allUsersReducer";
import { setNotification } from "../../reducers/notificationReducer";
import reviewService from "../../services/review";
import { removePost } from "../../reducers/postReducer";
import Pagination from "./Pagination";
import RenderAmount from "./RenderAmount";
import UserPosts from "./SingleUser/UserPosts";

const SingleUser = props => {
    const [showForm, setShowForm] = useState(false);
    const [bio, setBio] = useState("");
    const [amountInPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (props.users === null) {
            props.initUsers();
        }
    }, [props]);
    if (props.users === null) {
        return <Loading />;
    }

    const user = props.users.find(u => u._id === props.id);

    if (!user) {
        return (
            <div className="container" style={{ paddingTop: "1rem" }}>
                <h3>User has not been found</h3>
                <p>
                    You can find the user you're looking for with the navigation
                    bar, or if you're experiencing problems check the url.
                </p>
                <div>
                    <Link to="/">Go home</Link>
                </div>
                <Link to="/users">Go to users page</Link>
            </div>
        );
    }

    const lastReviewIndex = currentPage * amountInPage;
    const firstReviewIndex = lastReviewIndex - amountInPage;
    const currentReviews = user.reviewsPosted.slice(
        firstReviewIndex,
        lastReviewIndex
    );
    const paginate = pageNum => setCurrentPage(pageNum);

    if (user.username === "admin") {
        return <Redirect to="/users" />;
    }

    const renderReviews = currentReviews.map(r => (
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
            <p style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                {r.description.slice(0, 50)}
            </p>
        </div>
    ));

    const handleBioUpdate = event => {
        event.preventDefault();
        if (bio === "") {
            try {
                props.updateBio(bio);
                props.setNotification("Something went wrong", "error", 2);
            } catch {
                props.setNotification("Something went wrong", "error", 2);
            }
        }
    };

    return (
        <div className="container">
            <div className="row" style={{ marginTop: "1rem" }}>
                <div className="col-2">
                    <h2>{user.username}</h2>
                    <p>{user.personalShop.about}</p>
                    <Link to={`/report/user/${user._id}`}>
                        <button className="button-basic button-pink">
                            Report
                        </button>
                    </Link>
                    {props.user &&
                        (props.user.username === user.username &&
                            (!showForm ? (
                                <button
                                    style={{ marginBottom: "1rem" }}
                                    class="button-basic button-bluish"
                                    onClick={() => setShowForm(true)}
                                >
                                    Change bio
                                </button>
                            ) : (
                                <form onSubmit={handleBioUpdate}>
                                    <div class="form-group">
                                        <label>Bio</label>
                                        <textarea
                                            className="form-control"
                                            value={bio}
                                            onChange={({ target }) =>
                                                setBio(target.value)
                                            }
                                            maxLength={300}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            Change bio
                                        </button>{" "}
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => setShowForm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )))}
                </div>
                <div className="col-10" style={{ marginTop: 0, paddingTop: 0 }}>
                    <div>
                        <ul
                            className="nav"
                            style={{
                                borderBottom: "1px solid #d1d5da"
                            }}
                        >
                            <li className="nav-item" onClick={() => setPage(1)}>
                                {page === 1 ? (
                                    <Link
                                        className="nav-link active"
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            fontWeight: 500,
                                            borderBottom: "2px solid #cca8e9"
                                        }}
                                    >
                                        <strong>
                                            Posts{" "}
                                            <RenderAmount
                                                amount={user.posts.length}
                                            />
                                        </strong>
                                    </Link>
                                ) : (
                                    <Link
                                        style={{
                                            color: "black",
                                            textDecoration: "none"
                                        }}
                                        className="nav-link"
                                    >
                                        Posts{" "}
                                        <RenderAmount
                                            amount={user.posts.length}
                                        />
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item" onClick={() => setPage(2)}>
                                {page === 2 ? (
                                    <Link
                                        className="nav-link active"
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            fontWeight: 500,
                                            borderBottom: "2px solid #cca8e9"
                                        }}
                                    >
                                        <strong>
                                            Reviews{" "}
                                            <RenderAmount
                                                amount={
                                                    user.reviewsPosted.length
                                                }
                                            />
                                        </strong>
                                    </Link>
                                ) : (
                                    <Link
                                        style={{
                                            color: "black",
                                            textDecoration: "none"
                                        }}
                                        className="nav-link"
                                    >
                                        Reviews{" "}
                                        <RenderAmount
                                            amount={user.reviewsPosted.length}
                                        />
                                    </Link>
                                )}
                            </li>
                        </ul>
                        {page === 1 && (
                            <div>
                                <div className="mt-2">
                                    <UserPosts posts={user.posts} />
                                </div>
                            </div>
                        )}
                        {page === 2 && (
                            <div className="mt-3">
                                {renderReviews}
                                <div
                                    className="container"
                                    style={{ paddingTop: "1rem" }}
                                >
                                    <Pagination
                                        amountInPage={amountInPage}
                                        totalPosts={user.reviewsPosted.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.allUsers,
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    { initUsers, updateBio, setNotification, removePost }
)(SingleUser);
