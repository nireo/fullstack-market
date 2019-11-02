import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initUsers } from "../../reducers/allUsersReducer";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Loading";
import { updateBio } from "../../reducers/allUsersReducer";
import { setNotification } from "../../reducers/notificationReducer";
import { removePost } from "../../reducers/postReducer";
import Pagination from "./Pagination";
import RenderAmount from "./RenderAmount";
import UserPosts from "./SingleUser/UserPosts";
import UserReviews from "./SingleUser/UserReviews";

const SingleUser = props => {
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

    if (user.username === "admin") {
        return <Redirect to="/users" />;
    }

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
                            <div className="mt-2">
                                <UserReviews reviews={user.reviewsPosted} />
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
