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
            className="pagination-item rounded-l-lg hover:bg-slate-500"
            onClick={() => changePage(currentPage - 1)}
          >
            Назад
          </Link>
        </li>
        {pages.map((page) => (
          <li key={'page_' + page}>
            <Link
              className={`pagination-item hover:bg-slate-500 ${
                page === currentPage ? 'bg-slate-600 text-stone-300' : ''
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className="pagination-item rounded-r-lg hover:bg-slate-500"
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
