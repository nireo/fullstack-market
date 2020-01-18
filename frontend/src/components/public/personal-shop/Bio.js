import React from 'react';

const Bio = props => {
  return (
    <div class="container">
      <h4 className="mt-3">About</h4>
      <p>{props.about}</p>
    </div>
  );
};

export default Bio;
