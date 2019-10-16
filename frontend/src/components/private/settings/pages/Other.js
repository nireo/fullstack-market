import React from "react";
import userService from "../../../../services/user";
import { connect } from "react-redux";
import { setNotification } from "../../../../reducers/notificationReducer";
import { logOut } from "../../../../reducers/userReducer";

const Other = ({ user, setNotification, logOut }) => {
  const handleRemove = async event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want remove your account.")) {
      try {
        await userService.removeUser(user._id);
        setNotification("Sad to see you go...", "warning", 2);

        // sign the user out
        logOut();
      } catch {
        setNotification("Error deleting user", "error", 2);
      }
    }
  };

  return (
    <div>
      <div className="container" style={{ paddingTop: "3rem" }}>
        <div className="card shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Remove account</h4>
          </div>
          <div className="card-body">
            <p>All your data will be deleted with your account.</p>
            <button className="btn btn-danger" onClick={handleRemove}>
              Remove account
            </button>
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
  { setNotification, logOut }
)(Other);
