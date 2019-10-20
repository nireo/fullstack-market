import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../../Loading";

const EditPersonalPage = ({ color, oldAbout }) => {
  const [newColor, setNewColor] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    if (newColor === null) {
      setNewColor(color);
    }

    if (about === null) {
      setAbout(oldAbout);
    }
  }, [about, setAbout, newColor, setNewColor, color, oldAbout]);

  if (about === null || newColor === null) {
    return <Loading />;
  }

  const updateShop = event => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={updateShop}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={about}
            onChange={({ target }) => setAbout(target.value)}
            rows="7"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="color"
            value={newColor}
            onChange={({ target }) => setNewColor(target.value)}
          />
        </div>
        <button className="btn btn-primary">Commit changes</button>
      </form>
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
)(EditPersonalPage);
