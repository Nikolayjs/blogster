import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const Tags = ({ tags }) => {
  return (
    <div className="w-full mb-5 md:w-1/2 lg:w-full">
      <h5 className="font-bold text-lg uppercase dark:text-white text-gray-700 mb-2">
        Последние теги
      </h5>
      <ul>
        {tags.map((tag) => (
          <li
            key={uuidv4()}
            className="dark:border-transparent dark:hover:border-gray-200 px-1 py-4 border-y border-white hover:border-gray-200 transition-all duration-300"
          >
            <Link className="flex items-center dark:text-slate-400 text-gray-600" to="">
              <span className="inline-block w-4 h-4 mr-3"></span>
              {tag}
              <span className="text-gray-500 dark:text-slate-400 ml-auto">23 art</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
