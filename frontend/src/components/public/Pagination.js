import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ amountInPage, totalPosts, paginate }) => {
  const amountOfPages = [];
  for (let i = 1; i <= Math.ceil(totalPosts, amountInPage); i++) {
    amountOfPages.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {amountOfPages.map(n => (
          <li key={n} className="page-item">
            <Link onClick={() => paginate(n)} className="page-link">
              {n}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
