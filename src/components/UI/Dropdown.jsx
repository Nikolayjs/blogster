import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import IconUser from '../Icons/IconUser';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ list }) => {
  const { theme } = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className=" flex justify-center">
      {theme === 'dark' ? (
        <IconUser
          style="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer stroke-slate-200"
          onClick={handleOpen}
        />
      ) : (
        <IconUser
          style="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          onClick={handleOpen}
        />
      )}
      <ul
        className={`${
          open ? '' : 'hidden'
        } py-1 rounded-sm bg-white shadow-xl mt-10 dark:bg-slate-600 absolute text-sm text-gray-700 dark:text-gray-200`}
      >
        {list.map((el) => (
          <li key={uuidv4()} onClick={() => setOpen(!open)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
