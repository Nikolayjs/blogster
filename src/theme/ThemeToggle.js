import React from 'react';
import IconDark from '../components/Icons/IconDark';
import IconLight from '../components/Icons/IconLight';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <div className="transition duration-500 ease-in-out rounded-full">
      {theme === 'dark' ? (
        <IconLight
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer stroke-slate-200"
        />
      ) : (
        <IconDark
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
