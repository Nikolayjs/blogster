import React from 'react';

const Pagination = ({ posts }) => {
  return (
    <div className="mt-20 mb-10">
      <ul className="flex justify-center">
        <li>
          <a className="pagination-item rounded-l-lg" href="#">
            Назад
          </a>
        </li>
        {posts.map((post, i) => (
          <li key={i}>
            <a className="pagination-item" href="#">
              {i + 1}
            </a>
          </li>
        ))}
        <li>
          <a className="pagination-item rounded-r-lg" href="#">
            Дальше
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
