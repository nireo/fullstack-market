import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div class="jumbotron text-center">
      <h1>
        <strong style={{ color: '#4f81c7' }}>Benevol</strong>ant market
      </h1>
      <p class="lead text-muted">An online store that is less evil</p>
      <p>
        <Link to="/explore">
          <button class="btn btn-outline-primary my-2">Explore</button>
        </Link>
        {'    '}
        <Link to="/signup">
          <button class="btn btn-outline-secondary my-2">Signup</button>
        </Link>
      </p>
    </div>
  );
};

export default Welcome;
