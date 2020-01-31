import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ amountInPage, totalPosts, paginate }) => {
  const amountOfPages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / amountInPage); i++) {
    amountOfPages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" style={{ color: 'black' }}>
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </Link>
        </li>
        {amountOfPages.map(n => (
          <li key={n} className="page-item">
            <Link
              onClick={() => paginate(n)}
              className="page-link"
              style={{ color: 'black' }}
            >
              {n}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link className="page-link" style={{ color: 'black' }}>
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
