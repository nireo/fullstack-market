import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const ShowContent = ({ id, user }) => {
  const [content, setContent] = useState(null);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (content === null) {
      const checkForOwnership = user.communityItemsBought.find(
        i => i._id === id
      );
      if (checkForOwnership) {
        setContent(checkForOwnership);
      } else {
        setValidate(true);
      }
    }
  }, [validate, setValidate, content, setContent, id, user]);
  if (content === null && validate === true) {
    return (
      <div className="container">
        <h4>You've no permission to access this content.</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <h4>{content.title}</h4>
      <p>{content.content}</p>
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
)(ShowContent);
