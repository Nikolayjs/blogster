import React from 'react';

const Button = ({ className = '', onClick, disabled = false, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-400 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 `}
    >
      {children}
    </button>
  );
};

export default Button;
