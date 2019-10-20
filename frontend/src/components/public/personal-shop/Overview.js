import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initUsers } from "../../../reducers/allUsersReducer";
import Loading from "../../Loading";
import Pinned from "./Pinned";
import Bio from "./Bio";
import { Redirect } from "react-router-dom";
import EditPersonalPage from "./EditPersonalPage";

const Overview = props => {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (props.users === null) {
      props.initUsers();
    }
    if (props.users) {
      setUser(props.users.find(u => u._id === props.id));
    }
  }, [props]);

  if (user === null) {
    return <Loading />;
  }

  if (user.username === "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div
        className="jumbotron text-center"
        style={{ backgroundColor: "#4f81c7", borderRadius: "0%" }}
      >
        <h1 style={{ color: "white" }}>{user.username}'s shop</h1>
      </div>
      <Pinned posts={user.posts} />
      <Bio about={user.personalShop.about} id={user._id} />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        {props.user &&
          (props.user._id === user._id &&
            (!showForm ? (
              <div>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                >
                  Edit appearance
                </button>
              </div>
            ) : (
              <div className="container">
                <EditPersonalPage
                  color="#4f81c7"
                  oldAbout={user.personalShop.about}
                />
                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={() => setShowForm(false)}
                    className="btn btn-primary"
                  >
                    Hide form
                  </button>
                </div>
              </div>
            )))}
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
  { initUsers }
)(Overview);
