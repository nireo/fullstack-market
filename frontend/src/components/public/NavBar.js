import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <strong style={{ color: '#4f81c7' }}>Benevol</strong>ant
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Explore
            </a>
          </li>
        </ul>
        <Link to="/login">
          <button class="btn btn-outline-primary my-2 my-sm-0">Login</button>
        </Link>
        <Link to="signup">
          <button class="btn btn-outline-primary my-2 my-sm-0">Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
