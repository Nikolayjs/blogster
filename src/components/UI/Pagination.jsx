import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ posts }) => {
  return (
    <div className="mt-20 mb-10">
      <ul className="flex justify-center">
        <li>
          <Link className="pagination-item rounded-l-lg" to="#">
            Назад
          </Link>
        </li>
        {posts.map((post, i) => (
          <li key={i}>
            <Link className="pagination-item" to="#">
              {i + 1}
            </Link>
          </li>
        ))}
        <li>
          <Link className="pagination-item rounded-r-lg" to="#">
            Дальше
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
