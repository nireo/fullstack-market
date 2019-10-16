import React, { useState } from "react";
import { connect } from "react-redux";
import userData from "../../../../services/user";

const Information = ({ user }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailUpdate = event => {
    const newUserData = { ...user, email: newEmail };
  };

  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
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
            <div className="col-10">{user.reviewsPosted.length}</div>
          </div>
          <div className="row">
            <div className="col-2">Wishlist</div>
            <div className="col-10">{user.wishlist.length}</div>
          </div>
          <div className="row">
            <div className="col-2">Items Bought</div>
            <div className="col-10">
              {user.mainItemsBought.length + user.communityItemsBought.length}
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm" style={{ marginTop: "3rem" }}>
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Update Information</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-9">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New email"
                    value={newEmail}
                    onChange={({ target }) => setNewEmail(target.value)}
                  />
                </div>
              </div>
              <div className="col-3">
                <button type="submit" className="btn btn-primary">
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
                    type="text"
                    className="form-control"
                    placeholder="New email"
                    value={newUsername}
                    onChange={({ target }) => setNewUsername(target.value)}
                  />
                </div>
              </div>
              <div className="col-3">
                <button type="submit" className="btn btn-primary">
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
                    type="text"
                    className="form-control"
                    placeholder="New email"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                  />
                </div>
              </div>
              <div className="col-3">
                <button type="submit" className="btn btn-primary">
                  Change
                </button>
              </div>
            </div>
          </form>
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
  null
)(Information);