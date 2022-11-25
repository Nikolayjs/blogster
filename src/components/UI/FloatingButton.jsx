import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingButton = ({ link }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div onClick={() => setToggle(!toggle)} className="fixed right-6 bottom-6 group">
      <div
        id="speed-dial-menu-dropdown-alternative-square"
        className={`flex ${
          toggle ? '' : 'hidden'
        } flex-col justify-end py-1 mb-4 space-y-2 bg-white rounded-lg border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600`}
      >
        <ul className="text-sm text-gray-500 dark:text-gray-300">
          {link.map((el) => (
            <li key={el.icon}>
              <Link
                to={el.url}
                className="flex items-center py-2 px-5 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600"
              >
                {el.icon}
                <span className="text-sm font-medium">{el.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="flex justify-center items-center ml-auto w-14 h-14 text-white bg-blue-700 rounded-lg hover:bg-blue-800 active:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
        </svg>
        <span className="sr-only">Открыть меню</span>
      </button>
    </div>
  );
};

export default FloatingButton;
