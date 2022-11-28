import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ option }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="px-4 pt-4" onMouseLeave={handleClose}>
      <button
        onClick={handleOpen}
        className="inline-block absolute right-6 bottom-auto text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700  focus:outline-none  rounded-lg text-sm p-1.5"
        type="button"
      >
        <span className="sr-only">Открыть меню</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          isOpen ? '' : 'hidden'
        } text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute right-1 top-12`}
      >
        <ul>
          {option.map((el) => (
            <li key={el.name}>
              {el.link ? (
                <Link
                  to={el.link}
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  {el.name}
                </Link>
              ) : (
                <Link
                  onClick={() => el.func(el.id)}
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  {el.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
