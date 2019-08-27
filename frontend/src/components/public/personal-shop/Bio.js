import React from 'react';
import { Link } from 'react-router-dom';

const Bio = props => {
  return (
    <div class="container">
      <h4>About</h4>
      <p>{props.about}</p>
      <Link class="btn btn-primary" to={`/profile/${props.id}`}>
        Go to profile
      </Link>
    </div>
  );
};

export default Bio;
