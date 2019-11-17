import React from "react";
import { Link } from "react-router-dom";

const Finished = ({ name }) => {
    return (
        <div className="container mt-4">
            <h3>Finished creating your post.</h3>
            <p>
                Your post called '{name}' has been created. It now can be viewed
                by all users.
            </p>
            <Link to="/">Go back to home page.</Link>
        </div>
    );
};

export default Finished;
