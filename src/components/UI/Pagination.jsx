import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, changePage, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <div className="mt-20 mb-10">
      <ul className="flex justify-center">
        <li>
          <Link
            className="pagination-item rounded-l-lg"
            onClick={() => changePage(currentPage - 1)}
          >
            Назад
          </Link>
        </li>
        {pages.map((page) => (
          <li key={'page_' + page}>
            <Link
              className={`pagination-item ${page === currentPage ? 'bg-slate-300' : ''}`}
              onClick={() => changePage(page)}
            >
              {page}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className="pagination-item rounded-r-lg"
            onClick={() => changePage(currentPage + 1)}
          >
            Дальше
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
