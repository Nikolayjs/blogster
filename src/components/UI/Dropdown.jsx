import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import IconUser from '../Icons/IconUser';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ({ list }) => {
  const { theme } = React.useContext(ThemeContext);
  const rootEl = React.useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className=" flex justify-center" ref={rootEl}>
      {theme === 'dark' ? (
        <IconUser
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer stroke-slate-200 "
          onClick={handleOpen}
        />
      ) : (
        <IconUser
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer transition-all duration-1000"
          onClick={handleOpen}
        />
      )}
      <ul
        className={`${
          open ? '' : 'hidden'
        } py-1 rounded-sm bg-white shadow-xl mt-10 dark:bg-stone-600 absolute text-gray-700 dark:text-gray-200`}
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
