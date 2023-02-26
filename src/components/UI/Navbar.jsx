import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import ThemeToggle from '../../theme/ThemeToggle';
import Dropdown from './Dropdown';

const Navbar = () => {
  const [toogle, setToogle] = React.useState({ isOpen: true });
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const hidden = 'hidden w-full md:block md:w-auto';
  const visible = 'w-full md:block md:w-auto';

  const onClickLogout = () => {
    if (window.confirm('Выйти?')) {
      dispatch(logout());
      setToogle({ ...toogle, isOpen: !toogle.isOpen });
      window.localStorage.removeItem('token');
    }
  };
  const listItems = [
    <Link to={`/user/${userData?._id}`} className="block py-2 px-4">
      Личный кабинет
    </Link>,
    <Link to="/" className="block px-4" onClick={onClickLogout}>
      Выйти
    </Link>,
  ];
  return (
    <nav className="bg-gray-100 fixed w-full border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-zinc-800 z-50 dark:shadow-none">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white dark:hover:text-blue-400 transition-all duration-200">
            Коломбос
          </span>
        </Link>

        <div className="inline-flex items-center md:hidden">
          <ThemeToggle />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className=" p-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setToogle({ ...toogle, isOpen: !toogle.isOpen })}
          >
            <span className="sr-only">Открыть меню</span>

            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className={toogle.isOpen ? hidden : visible} id="navbar-default">
          <ul className="flex flex-col p-4 mt-4  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
            {isAuth ? (
              <>
                <Link to="/notes" className="link">
                  Заметки
                </Link>
                {toogle.isOpen ? (
                  <Dropdown list={listItems} />
                ) : (
                  <>
                    <Link
                      to={`/user/${userData?._id}`}
                      onClick={() => setToogle({ ...toogle, isOpen: !toogle.isOpen })}
                    >
                      Личный кабинет
                    </Link>
                    <Link to="/" className="link" onClick={onClickLogout}>
                      Выйти
                    </Link>
                  </>
                )}
                {toogle.isOpen ? <ThemeToggle /> : ''}
              </>
            ) : (
              <>
                <Link to="/login" className="link">
                  Войти
                </Link>

                {toogle.isOpen ? <ThemeToggle /> : ''}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
