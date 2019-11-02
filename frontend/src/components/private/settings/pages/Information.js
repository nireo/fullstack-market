import React, { useState } from "react";
import { connect } from "react-redux";
import userService from "../../../../services/user";
import { setNotification } from "../../../../reducers/notificationReducer";
import { updateBio } from "../../../../reducers/allUsersReducer";

const Information = ({ user, setNotification, updateBio }) => {
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showEditForm, setShowEditForm] = useState(false);
    const [newBio, setNewBio] = useState("");

    const handleEmailUpdate = async event => {
        event.preventDefault();
        const newUserData = { ...user, email: newEmail };
        try {
            await userService.updateUser(user._id, newUserData);
            setNotification(
                "Email has been successfully updated",
                "success",
                2
            );
        } catch {
            setNotification("Something went wrong while updating", "error", 2);
        }
    };

    const handleUsernameUpdate = async event => {
        event.preventDefault();
        const newUserData = { ...user, username: newUsername };
        try {
            await userService.updateUser(user._id, newUserData);
            setNotification(
                "Email has been successfully updated",
                "success",
                2
            );
        } catch {
            setNotification("Something went wrong while updating", "error", 2);
        }
    };

    const handleBioUpdate = event => {
        event.preventDefault();
        if (newBio !== "") {
            try {
                updateBio(newBio);
                setNotification("Bio changed", "success", 2);
            } catch {
                setNotification("Something went wrong", "error", 2);
            }
        }
    };

    return (
        <div className="container" style={{ paddingTop: "2rem" }}>
            <div className="card shadow-sm">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Information</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-2">Email</div>
                        <div className="col-10">{user.email}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Username</div>
                        <div className="col-10">{user.username}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Posts</div>
                        <div className="col-10">{user.posts.length}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Reviews</div>
                        <div className="col-10">
                            {user.reviewsPosted.length}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">Wishlist</div>
                        <div className="col-10">{user.wishlist.length}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Items Bought</div>
                        <div className="col-10">
                            {user.mainItemsBought.length +
                                user.communityItemsBought.length}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm" style={{ marginTop: "2rem" }}>
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">
                        Update Information
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleEmailUpdate}>
                        <div className="row">
                            <div className="col-9">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="New email"
                                        value={newEmail}
                                        onChange={({ target }) =>
                                            setNewEmail(target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={handleUsernameUpdate}>
                        <div className="row">
                            <div className="col-9">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="New username"
                                        value={newUsername}
                                        onChange={({ target }) =>
                                            setNewUsername(target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </form>
                    <form>
                        <div className="row">
                            <div className="col-9">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={({ target }) =>
                                            setNewPassword(target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card shadow-sm" style={{ marginTop: "2rem" }}>
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Preferences</h4>
                </div>
                <div className="card-body"></div>
            </div>
            <div className="card shadow-sm" style={{ marginTop: "2rem" }}>
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Bio</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <p>{user.personalShop.about}</p>
                        </div>
                        <div className="col-6">
                            {showEditForm === false ? (
                                <button
                                    className="button-basic button-pink"
                                    onClick={() => setShowEditForm(true)}
                                >
                                    Edit
                                </button>
                            ) : (
                                <form onSubmit={handleBioUpdate}>
                                    <div className="form-group">
                                        <label>New bio</label>
                                        <textarea
                                            className="form-control"
                                            value={newBio}
                                            onChange={({ target }) => {
                                                setNewBio(target.value);
                                            }}
                                            maxLength={300}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="button-basic button-bluish"
                                        >
                                            Change bio
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    { setNotification, updateBio }
)(Information);
